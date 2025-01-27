import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
 
  
 
export default defineSchema({
  // not handling filhaal
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
    user: v.string(), // clerk user please
    url: v.string(),
  }),

  notes: defineTable({
    id: v.string(),
    pdfId: v.string(),
    text: v.string(),
    title: v.string(),
    user: v.string(), // clerk user please
  }),

 
  documents: defineTable({
    embedding: v.array(v.number()),
    text: v.string(),
    metadata: v.any(),
  }).vectorIndex("byEmbedding", {
    vectorField: "embedding",
    
    // this took my hours of debugging of mismatch-dimensions while searching in the vector-store
    dimensions: 768,  
  }),

  //   users: defineTable({
  //     name: v.string(),
  //     tokenIdentifier: v.string(),
  //   }).index("by_token", ["tokenIdentifier"]),
});