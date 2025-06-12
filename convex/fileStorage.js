import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const AddFileEntryToDb = mutation({
  args: {
    fileId: v.string(),
    fileName: v.string(),
    storageId: v.string(),
    createdBy: v.string(),
    fileUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const { fileId, fileName, storageId, createdBy, fileUrl } = args;
    return await ctx.db.insert("pdfFiles", {
      fileId,
      fileName,
      storageId,
      createdBy,
      fileUrl,
    });
  },
});

export const getFileUrl = mutation({
  args: { storageId: v.string() },
  handler: async (ctx, { storageId }) => {
    return await ctx.storage.getUrl(storageId);
  },
});
