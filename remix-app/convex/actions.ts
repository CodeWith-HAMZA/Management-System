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
    for (const chunk of args.chunks) {
      const chunkEmbedding = await embeddings.embedQuery(chunk);
      console.log(`Ingest: Chunk embedding dimensions: ${chunkEmbedding.length}`);
    }
    
    // // const queryEmbedding = await embeddings.embedQuery(args.chunks.at(0) + args.chun);
    // console.log("CHUNK embedding dimensions:", queryEmbedding.length);

    console.log(embeddings, ' embeddings')
    const metadata = args.chunks.map(() => ({ fileId: args.fileId }));

    await ConvexVectorStore.fromTexts(
      args.chunks as string[],
      metadata,
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
    // console.log(args, ' SSS')
    // return;

    // converting text-query to embeddings
    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "text-embedding-004",  
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: "Document title",
      apiKey: GEMENI_API_KEY,
       
  });

    // Now, matching the vector valuess with database and performing similarity search
    const vectorStore = new ConvexVectorStore(embeddings, { ctx });

    // Convert query text into embeddings
    const queryEmbedding = await embeddings.embedQuery(args.query);
    // console.log("Query embedding dimensions:", queryEmbedding.length);


    let results = await vectorStore.similaritySearch(args.query, 3);
    results = results.filter(q => q.metadata.fileId === args.fileId)
    
   
    
    // return results;
    // console.log(typeof results, results.at(0));

    return  JSON.stringify(results) ;
    
  },
});