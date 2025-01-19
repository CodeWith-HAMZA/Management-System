"use node";

import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { OpenAIEmbeddings } from "@langchain/openai";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { GEMENI_API_KEY } from "constants/index.js";
import { v } from "convex/values";

export const ingest = action({
  args: {
    chunks: v.any(),
    fileId: v.string(),
    title: v.string(),
  },

  handler: async (ctx, args) => {
     const embeddings = new GoogleGenerativeAIEmbeddings({
        model: "text-embedding-004",  
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
        apiKey: GEMENI_API_KEY,
    });
    console.log(embeddings, ' embeddings')
    await ConvexVectorStore.fromTexts(
      args.chunks as string[],
      [{ prop: 2, fileId: args?.fileId  }],
      embeddings,
      { ctx }
    );

  },
  
});

// search action
export const search = action({
  args: {
    query: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {

    // converting text-query to embeddings
    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "text-embedding-004",  
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: "Document title",
      apiKey: GEMENI_API_KEY,
  });

    // Now, matching the vector valuess with database and performing similarity search
    const vectorStore = new ConvexVectorStore(embeddings, { ctx });
    const results = await vectorStore.similaritySearch(args.query, 1);
    results.filter(
      (result) => result.metadata.fileId === args.fileId
    )
    // return results.map((result) => result.pageContent);
    return results
  },
});