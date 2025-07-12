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
