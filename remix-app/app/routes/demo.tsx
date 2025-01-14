// File: routes/data-fetch.tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";


export const loader = async () => {
  console.log("server");

  const fileUrl = "https://cautious-rat-48.convex.cloud/api/storage/0ee0cf74-98d4-412c-9f89-9918c949c44c";
  const res = await fetch(fileUrl)
  const data = await res.blob()

  // fetching

  const loader = new WebPDFLoader(data);
  const docs = await loader.load();

  let textContentOfFile = '';
  // getting content of the file (only text)
  docs.forEach((doc) => {
    textContentOfFile += doc.pageContent;
  });


  // split the text into chunks
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

 
const texts = await textSplitter.createDocuments([textContentOfFile]);

let splitterList: Array<string> = [];

texts.forEach(text => {
  splitterList.push(text.pageContent)
})
  return json({ ok: true, splitterList });
};


export default function DataFetchPage() {
  
  const data = useLoaderData<typeof loader>();
   console.log(data);
  return JSON.stringify(data);
}
