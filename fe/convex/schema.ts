import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
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
  }).index("by_email", ["email"]),

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
