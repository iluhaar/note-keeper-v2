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
    // Check if a user with this email already exists (manual registration)
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", event.data.email))
      .first();

    if (existingUser) {
      // Link the WorkOS authId to the existing user
      await ctx.db.patch(existingUser._id, {
        authId: event.data.id,
        name: existingUser.name || `${event.data.firstName ?? ""} ${event.data.lastName ?? ""}`.trim(),
      });
    } else {
      // Create a new user record
      await ctx.db.insert("users", {
        authId: event.data.id,
        email: event.data.email,
        name: `${event.data.firstName ?? ""} ${event.data.lastName ?? ""}`.trim() || "User",
        tags: {},
      });
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
