const { ConvexHttpClient } = require("convex/browser");
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, get } = require("firebase/database");
const { firebaseConfig } = require("./constants");

// Convex client
const convex = new ConvexHttpClient("https://academic-falcon-348.convex.cloud");

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseDb = getDatabase(firebaseApp);

// Helper function to clean tags (remove extra fields)
function cleanTags(tags) {
  if (!tags || !Array.isArray(tags)) return [];

  return tags.map((tag) => ({
    label: tag.label,
    color: tag.color,
    id: tag.id,
    // Remove 'selected' field and any other extra fields
  }));
}

// Helper function to retry operations
async function retryOperation(operation, maxRetries = 5, delay = 2000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;

      console.log(
        `⚠️ Retry ${i + 1}/${maxRetries} after error:`,
        error.message
      );
      await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));
    }
  }
}

async function migrateFailedUsers() {
  console.log("🚀 Migrating failed users from Firebase to Convex...");

  // List of users that failed in the first migration
  const failedUsers = ["iryna.patrykats@gmail.com", "iluhaar@gmail.com"];

  try {
    // 1. Fetch all users from Firebase
    console.log("📥 Fetching users from Firebase...");
    const usersSnapshot = await get(ref(firebaseDb, "users"));
    const users = usersSnapshot.val();

    if (!users) {
      console.log("❌ No users found in Firebase");
      return;
    }

    // 2. Migrate only the failed users
    for (const [firebaseUserId, userData] of Object.entries(users)) {
      const user = userData;

      // Only migrate the failed users
      if (!failedUsers.includes(user.email)) {
        continue;
      }

      console.log(`\n👤 Migrating failed user: ${user.email}`);

      try {
        // Check if user already exists in Convex
        const existingUser = await convex.query("users:getUserByEmail", {
          email: user.email,
        });

        let convexUserId;
        if (existingUser) {
          convexUserId = existingUser._id;
          console.log(
            `✅ User already exists in Convex with ID: ${convexUserId}`
          );
        } else {
          // Create user in Convex
          convexUserId = await retryOperation(async () => {
            return await convex.mutation("users:createUser", {
              name: user.name,
              email: user.email,
              tags: user.tags || {},
            });
          });
          console.log(`✅ User created in Convex with ID: ${convexUserId}`);
        }

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
            await retryOperation(async () => {
              await convex.mutation("notes:createNote", {
                userId: convexUserId,
                note: note.note,
                tags: cleanTags(note.tags), // Clean the tags
              });
            });
          }

          console.log(
            `✅ Migrated ${notes.length} notes for user: ${user.email}`
          );
        } else {
          console.log(`ℹ️ No notes found for user: ${user.email}`);
        }
      } catch (error) {
        console.error(
          `❌ Failed to migrate user ${user.email}:`,
          error.message
        );
      }
    }

    console.log("\n🎉 Failed users migration completed!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
  }
}

// Run the migration
migrateFailedUsers().catch(console.error);
