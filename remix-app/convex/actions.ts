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
    chunks: v.any()
  },

  handler: async (ctx, args) => {

    const embeddings = new GoogleGenerativeAIEmbeddings({
        model: "text-embedding-004",  
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
        apiKey: GEMENI_API_KEY,
    });

    await ConvexVectorStore.fromTexts(
      args.chunks,
      [{ prop: 2 }, { prop: 1 }, { prop: 3 }],
      embeddings,
      { ctx }
    );

  },
  
});