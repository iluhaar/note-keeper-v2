import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    authId: v.optional(v.string()), // WorkOS user ID, optional for manually registered users
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
  })
    .index("by_email", ["email"])
    .index("authId", ["authId"]),

  notes: defineTable({
    userId: v.id("users"),
    note: v.string(),
    tags: v.array(
      v.object({
        label: v.string(),
        color: v.string(),
        id: v.string(),
      })
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),
});
