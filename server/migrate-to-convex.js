const { ConvexHttpClient } = require("convex/browser");
const { initializeApp } = require("firebase/app");
const { getDatabase, ref, get } = require("firebase/database");
const { firebaseConfig } = require("./constants");

// Convex client - use environment variable or fallback
const convexUrl =
  process.env.CONVEX_URL || "https://academic-falcon-348.convex.cloud";
const convex = new ConvexHttpClient(convexUrl);

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
async function retryOperation(operation, maxRetries = 3, delay = 1000) {
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

async function migrateData() {
  console.log("🚀 Starting migration from Firebase to Convex...");
  console.log(`📡 Using Convex URL: ${convexUrl}`);

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
      const user = userData;
      console.log(`\n👤 Migrating user: ${user.email}`);

      try {
        // Create user in Convex (without password - they'll need to reset)
        const convexUserId = await retryOperation(async () => {
          return await convex.mutation("users:createUser", {
            name: user.name,
            email: user.email,
            tags: user.tags || {},
          });
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

        // If it's a network error, suggest retrying
        if (
          error.message.includes("ETIMEDOUT") ||
          error.message.includes("fetch failed")
        ) {
          console.log(
            `💡 Suggestion: Try running the migration again for this user`
          );
        }
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
