import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

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

// Create a new user
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

    return await ctx.db.insert("users", {
      name: args.name,
      email: args.email,
      password: args.password,
      tags: args.tags || {},
    });
  },
});

// Authenticate existing user
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

    const isValid = args.password === user.password;

    // Simple password check (in real app, use proper hashing)
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

    // Update password
    await ctx.db.patch(user._id, {
      password: args.newPassword,
    });

    return {
      success: true,
      message: "Password updated successfully",
    };
  },
});

// Update user tags
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
