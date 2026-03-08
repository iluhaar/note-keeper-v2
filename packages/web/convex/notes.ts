import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// Get all notes for a user
export const getNotes = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("notes")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

// Create a new note
export const createNote = mutation({
  args: {
    userId: v.id("users"),
    note: v.string(),
    tags: v.array(
      v.object({
        label: v.string(),
        color: v.string(),
        id: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("notes", {
      userId: args.userId,
      note: args.note,
      tags: args.tags,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Update an existing note
export const updateNote = mutation({
  args: {
    noteId: v.id("notes"),
    note: v.string(),
    tags: v.array(
      v.object({
        label: v.string(),
        color: v.string(),
        id: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.noteId, {
      note: args.note,
      tags: args.tags,
      updatedAt: Date.now(),
    });
  },
});

// Delete a note
export const deleteNote = mutation({
  args: { noteId: v.id("notes") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.noteId);
  },
});

// Get a single note by ID
export const getNoteById = query({
  args: { noteId: v.id("notes") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.noteId);
  },
});

// Update all notes for a user (for bulk operations)
export const updateAllNotes = mutation({
  args: {
    userId: v.id("users"),
    notes: v.array(
      v.object({
        id: v.string(),
        note: v.string(),
        tags: v.array(
          v.object({
            label: v.string(),
            color: v.string(),
            id: v.string(),
          })
        ),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Delete existing notes for this user
    const existingNotes = await ctx.db
      .query("notes")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    for (const note of existingNotes) {
      await ctx.db.delete(note._id);
    }

    // Insert new notes
    const noteIds: Id<"notes">[] = [];
    for (const note of args.notes) {
      const noteId = await ctx.db.insert("notes", {
        userId: args.userId,
        note: note.note,
        tags: note.tags,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      noteIds.push(noteId);
    }

    return noteIds;
  },
});
