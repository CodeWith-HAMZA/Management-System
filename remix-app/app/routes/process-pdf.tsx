import { json } from "@remix-run/node";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const action = async ({ request }: {request: Request}) => {
  const { fileUrl } = await request.json();


  // Fetch the PDF from the provided URL
  const res = await fetch(fileUrl);
  const blob = await res.blob();

  // Load the PDF using LangChain's WebPDFLoader
  const loader = new WebPDFLoader(blob);
  const docs = await loader.load();

  // Extract text content from all pages
  let textContent = "";
  docs.forEach((doc) => {
    textContent += doc.pageContent;
  });

  // Split text into chunks
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 70, // Reduced from 1000 to 600
    chunkOverlap: 20, // Increased overlap for better context retention
  
  });
  const chunks = await textSplitter.createDocuments([textContent]);

  console.log(chunks)
  // Return the split chunks
  return json({ ok: true, chunks: chunks.map((chunk) => chunk.pageContent) });
};
