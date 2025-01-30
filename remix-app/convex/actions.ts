"use node";

import { ConvexVectorStore } from "@langchain/community/vectorstores/convex"; 
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { OpenAIEmbeddings} from "@langchain/openai";

import { TaskType } from "@google/generative-ai";
import { GEMENI_API_KEY, OPENAI_API_KEY } from "constants/index.js";
import { v } from "convex/values";

export const ingest = action({
  args: {
    chunks: v.any(),
    fileId: v.string(),
    title: v.string(),
  },

  handler: async (ctx, args) => {
    const openAiEmbeddings = new OpenAIEmbeddings({
      apiKey: OPENAI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
      // batchSize: 512, // Default value if omitted is 512. Max is 2048
      
      model: "text-embedding-3-large",
      
    });
     const embeddings = new GoogleGenerativeAIEmbeddings({
        model: "text-embedding-004",  
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        
        title: "Document title",
        apiKey: GEMENI_API_KEY, 
    });


    // // for testing chunks
    // for (const chunk of args.chunks) {
    //   const chunkEmbedding = await embeddings.embedQuery(chunk);
    //   console.log(`Ingest: Chunk embedding dimensions: ${chunkEmbedding.length}`);
    // }
    
    // // const queryEmbedding = await embeddings.embedQuery(args.chunks.at(0) + args.chun);
    // console.log("CHUNK embedding dimensions:", queryEmbedding.length);

    console.log(embeddings, ' embeddings')

    // preparing the metadata for each chunk
    const metadata = args.chunks.map(() => ({ fileId: args.fileId }));

    await ConvexVectorStore.fromTexts(
      args.chunks as string[],
      metadata,
      openAiEmbeddings,
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

    const openAiEmbeddings = new OpenAIEmbeddings({
      apiKey: OPENAI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
      // batchSize: 512, // Default value if omitted is 512. Max is 2048
        
      model: "text-embedding-3-large",
      
    });
    // converting text-query to embeddings
    const embeddings = new GoogleGenerativeAIEmbeddings({
      model: "text-embedding-004",  
      taskType: TaskType.RETRIEVAL_DOCUMENT,
      title: "Document title",
      apiKey: GEMENI_API_KEY,
       
  });

    // Now, matching the vector valuess with database and performing similarity search
    const vectorStore = new ConvexVectorStore(openAiEmbeddings, { ctx });

    // Convert query text into embeddings
    const queryEmbedding = await openAiEmbeddings.embedQuery(args.query);
    // console.log("Query embedding dimensions:", queryEmbedding.length);


    let results = await vectorStore.similaritySearch(args.query, 1);
    
    results = results.filter(q => q.metadata.fileId === args.fileId)
    
   
    
    // return results;
    // console.log(typeof results, results.at(0));

    return  JSON.stringify(results) ;
    
  },
});