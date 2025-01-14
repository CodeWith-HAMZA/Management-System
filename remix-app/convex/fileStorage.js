// it must pdf.ts for better readablity, for now i didn't change

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});


export const createPdfFile = mutation({
  args: {
    id: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    user: v.string()
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("pdfs", {
      id: args.id,
      storageId: args.storageId,
      fileName: args.fileName,
      url: await ctx.storage.getUrl(args.storageId),
      user: args.user
    });
  },
});

// get file by id
export const getFileById = query({
  args: {
    id: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("pdfs")
      .filter((q) => q.eq(q.field("id"), args.id))
      .collect();
  },
});

// get all files of all users
export const getAllFiles = query({
  handler: async (ctx) => {
    return await ctx.db.query("pdfs").collect();
  },
});


// get files
 export const getFiles = query({
  args: {
    user: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("pdfs")
      .filter((q) => q.eq(q.field("user"), args.user))
      .order('desc') 
      .take(5);
  },
});
 

// get most recent files by createdat

export const getRecentFiles = query({
  args: {
    user: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("pdfs")
      .filter((q) => q.eq(q.field("user"), args.user))
      .order("desc").
      .take(5);
  },
});

// get file url mutation using storage id
export const getFileUrl = mutation({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
