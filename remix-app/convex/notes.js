import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

 
// create(upsert) note mutation
export const createNote = mutation({
  args: {
    id: v.string(),
    pdfId: v.string(),
    text: v.string(),
    user: v.string(),
    title: v.string()
  },
  handler: async (ctx, args) => {

    // if with same pdfId already exists update the text field 
    const note = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("pdfId"), args.pdfId))
      .collect();
      // note.at(0).text = args.text;


      // appending
      if (note.length > 0) {
        return await ctx.db.patch(note[0]._id, {
          text:  args.text,
        });
      }

   return await ctx.db.insert("notes", {
      id: args.id,
      pdfId: args.pdfId,
      user: args.user,
      title: args.title,
      text: args.text
     });
  },
});

// get notes by pdfId
export const getNotesByPdfId = query({
  args: {
    pdfId: v.string(),
  },
  handler: async (ctx, args) => {
     
    return await ctx.db.query("notes").filter((q) => q.eq(q.field("pdfId"), args.pdfId)).collect();
  },
});