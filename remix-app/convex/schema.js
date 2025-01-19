import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
 
  
 
export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.string(),
    // waah: v.number(), 
  }), 

  pdfs: defineTable({
    id: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    user: v.string(),
    url: v.string(),
  }),



  // vector store   

  documents: defineTable({
    embedding: v.array(v.number()),
    text: v.string(),
    metadata: v.any(),
  }).vectorIndex("byEmbedding", {
    vectorField: "embedding",
    dimensions: 1536,
  }),

  //   users: defineTable({
  //     name: v.string(),
  //     tokenIdentifier: v.string(),
  //   }).index("by_token", ["tokenIdentifier"]),
});