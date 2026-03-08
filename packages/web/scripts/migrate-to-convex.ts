import { ConvexHttpClient } from "convex/browser";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get } from "firebase/database";

// Firebase config - you'll need to add your Firebase config here
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "note-keeper-24d3d.firebaseapp.com",
  databaseURL:
    "https://note-keeper-24d3d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "note-keeper-24d3d",
  storageBucket: "note-keeper-24d3d.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Convex client - you'll need to add your Convex URL here
const convex = new ConvexHttpClient(
  process.env.CONVEX_URL || "https://academic-falcon-348.convex.cloud"
);

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseDb = getDatabase(firebaseApp);

interface FirebaseUser {
  name: string;
  email: string;
  password: string;
  id: string;
  tags?: Record<string, { label: string; color: string; id: string }>;
}

async function migrateData() {
  console.log("🚀 Starting migration from Firebase to Convex...");

  try {
    // 1. Fetch all users from Firebase
    console.log("📥 Fetching users from Firebase...");
    const usersSnapshot = await get(ref(firebaseDb, "users"));
    const users = usersSnapshot.val();

    if (!users) {
      console.log("❌ No users found in Firebase");
      return;
    }

    console.log(`📊 Found ${Object.keys(users).length} users`);

    // 2. Migrate each user and their data
    for (const [firebaseUserId, userData] of Object.entries(users)) {
      const user = userData as FirebaseUser;
      console.log(`\n👤 Migrating user: ${user.email}`);

      try {
        // Create user in Convex (without password - they'll need to reset)
        const convexUserId = await convex.mutation("users:createUser", {
          name: user.name,
          email: user.email,
          tags: user.tags || {},
        });

        console.log(`✅ User created in Convex with ID: ${convexUserId}`);

        // 3. Fetch and migrate user's notes
        console.log(`📝 Fetching notes for user: ${user.email}`);
        const notesSnapshot = await get(
          ref(firebaseDb, `notes/${firebaseUserId}`)
        );
        const notes = notesSnapshot.val();

        if (notes && Array.isArray(notes)) {
          console.log(`📊 Found ${notes.length} notes for user: ${user.email}`);

          // Migrate each note
          for (const note of notes) {
            await convex.mutation("notes:createNote", {
              userId: convexUserId,
              note: note.note,
              tags: note.tags || [],
            });
          }

          console.log(
            `✅ Migrated ${notes.length} notes for user: ${user.email}`
          );
        } else {
          console.log(`ℹ️ No notes found for user: ${user.email}`);
        }
      } catch (error) {
        console.error(`❌ Failed to migrate user ${user.email}:`, error);
      }
    }

    console.log("\n🎉 Migration completed successfully!");
    console.log(
      "\n📧 IMPORTANT: Users will need to reset their passwords since we can't migrate hashed passwords."
    );
    console.log(
      "   They can use the 'Forgot Password' feature to set new passwords."
    );
  } catch (error) {
    console.error("❌ Migration failed:", error);
  }
}

// Run the migration
migrateData().catch(console.error);
