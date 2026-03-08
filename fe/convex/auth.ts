import { query } from "./_generated/server";
import { components, internal } from "./_generated/api";
import { AuthKit, type AuthFunctions } from "@convex-dev/workos-authkit";
import type { DataModel } from "./_generated/dataModel";

const authFunctions: AuthFunctions = internal.auth;

export const authKit = new AuthKit<DataModel>(components.workOSAuthKit, {
  authFunctions,
});

export const { authKitEvent } = authKit.events({
  "user.created": async (ctx, event) => {
    const email = event.data.email;
    const authId = event.data.id;
    const name = `${event.data.firstName ?? ""} ${event.data.lastName ?? ""}`.trim() || "User";

    // First try to find by authId (fast path)
    const byAuthId = await ctx.db
      .query("users")
      .withIndex("authId", (q) => q.eq("authId", authId))
      .first();

    if (byAuthId) {
      // Already exists by authId, just update
      await ctx.db.patch(byAuthId._id, { email, name });
      return;
    }

    // Try to find by email
    const byEmail = email
      ? await ctx.db
          .query("users")
          .withIndex("by_email", (q) => q.eq("email", email))
          .first()
      : null;

    if (byEmail) {
      // Link existing manual user to WorkOS authId
      await ctx.db.patch(byEmail._id, { authId, name: byEmail.name || name });
      return;
    }

    // Safe insert with retry on race condition
    // Use placeholder email if WorkOS didn't provide one
    const userEmail = email || `${authId}@workos.local`;

    try {
      await ctx.db.insert("users", {
        authId,
        email: userEmail,
        name,
        tags: {},
      });
    } catch (err) {
      // Race condition: another request created the user between our query and insert
      // Find and update the existing record
      const existing = await ctx.db
        .query("users")
        .withIndex("authId", (q) => q.eq("authId", authId))
        .first();

      if (existing) {
        await ctx.db.patch(existing._id, { email: userEmail, name });
      }
    }
  },

  "user.updated": async (ctx, event) => {
    const user = await ctx.db
      .query("users")
      .withIndex("authId", (q) => q.eq("authId", event.data.id))
      .unique();

    if (!user) {
      console.warn(`User not found for authId: ${event.data.id}`);
      return;
    }

    await ctx.db.patch(user._id, {
      email: event.data.email,
      name: `${event.data.firstName ?? ""} ${event.data.lastName ?? ""}`.trim() || user.name,
    });
  },

  "user.deleted": async (ctx, event) => {
    const user = await ctx.db
      .query("users")
      .withIndex("authId", (q) => q.eq("authId", event.data.id))
      .unique();

    if (!user) {
      console.warn(`User not found for authId: ${event.data.id}`);
      return;
    }

    await ctx.db.delete(user._id);
  },
});

// Get the current authenticated WorkOS user from the component's internal table
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return await authKit.getAuthUser(ctx);
  },
});
