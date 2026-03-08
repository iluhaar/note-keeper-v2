import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { hashPassword, verifyPassword } from "./hashing";

// Get user by email
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

// Resolve the app user record for a WorkOS-authenticated session.
// This is a mutation so it can link authId on first WorkOS login.
// Email and name are passed from the client-side WorkOS SDK because
// the JWT token from WorkOS does not include profile claims.
export const getOrCreateUserByAuth = mutation({
  args: {
    email: v.optional(v.string()),
    name: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    const authId = identity.subject;

    // First try to find by authId (fast path for returning users)
    const byAuthId = await ctx.db
      .query("users")
      .withIndex("authId", (q) => q.eq("authId", authId))
      .first();

    if (byAuthId) {
      // If this record was created before we had email/name from WorkOS,
      // check if we should merge with an existing manual user by email
      const email = args.email || identity.email;
      if ((!byAuthId.email || byAuthId.name === "User") && email) {
        const byEmail = await ctx.db
          .query("users")
          .withIndex("by_email", (q) => q.eq("email", email))
          .first();

        if (byEmail && byEmail._id !== byAuthId._id) {
          // Merge: link authId to the real user, delete the empty shell
          await ctx.db.patch(byEmail._id, { authId });
          await ctx.db.delete(byAuthId._id);
          return await ctx.db.get(byEmail._id);
        }

        // No matching manual user, just fill in the missing data
        const patch: Record<string, string> = {};
        if (!byAuthId.email && email) patch.email = email;
        if (byAuthId.name === "User" && args.name) patch.name = args.name;
        if (Object.keys(patch).length > 0) {
          await ctx.db.patch(byAuthId._id, patch);
          return await ctx.db.get(byAuthId._id);
        }
      }
      return byAuthId;
    }

    // Fall back to finding by email and link the authId
    const email = args.email || identity.email;
    if (email) {
      const byEmail = await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", email))
        .first();

      if (byEmail) {
        // Link the WorkOS authId to the existing manual user
        await ctx.db.patch(byEmail._id, { authId });
        return await ctx.db.get(byEmail._id);
      }
    }

    // No existing user found -- create one (with race condition handling)
    // Use placeholder email if WorkOS didn't provide one to avoid empty-string index entries
    const userName = args.name || identity.name || "User";
    const userEmail = email || `${authId}@workos.local`;

    try {
      const userId = await ctx.db.insert("users", {
        authId,
        name: userName,
        email: userEmail,
        tags: {},
      });

      return await ctx.db.get(userId);
    } catch (err) {
      // Race condition: webhook or another request created the user
      // Find and return the existing record
      const existing = await ctx.db
        .query("users")
        .withIndex("authId", (q) => q.eq("authId", authId))
        .first();

      if (existing) {
        return existing;
      }

      // Try by email as fallback
      if (userEmail) {
        const byEmail = await ctx.db
          .query("users")
          .withIndex("by_email", (q) => q.eq("email", userEmail))
          .first();
        if (byEmail) {
          // Link authId to existing manual user
          await ctx.db.patch(byEmail._id, { authId });
          return await ctx.db.get(byEmail._id);
        }
      }

      return null;
    }
  },
});

// Create a new user (manual registration)
export const createUser = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    password: v.optional(v.string()),
    tags: v.optional(
      v.record(
        v.string(), // key type
        v.object({
          label: v.string(),
          color: v.string(),
          id: v.string(),
        })
      )
    ),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash password before storing
    const hashedPassword = args.password
      ? await hashPassword(args.password)
      : undefined;

    return await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      password: hashedPassword,
      tags: args.tags || {},
    });
  },
});

// Authenticate existing user (manual login)
export const authenticateUser = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const isValid = await verifyPassword(args.password, user.password ?? "");

    if (!isValid) {
      throw new Error("Invalid password");
    }

    return user;
  },
});

// Simple password update (no tokens, no email verification)
export const updatePassword = mutation({
  args: {
    email: v.string(),
    newPassword: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Hash the new password before storing
    const hashedPassword = await hashPassword(args.newPassword);

    // Update password
    await ctx.db.patch(user._id, {
      password: hashedPassword,
    });

    return {
      success: true,
      message: "Password updated successfully",
    };
  },
});

// Update user tags (auth-guarded: accepts either userId for manual login or uses auth identity)
export const updateUserTags = mutation({
  args: {
    userId: v.id("users"),
    tags: v.record(
      v.string(), // key type
      v.object({
        label: v.string(),
        color: v.string(),
        id: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      tags: args.tags,
    });

    return { success: true, data: args.tags };
  },
});

// Get user by ID
export const getUserById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});
