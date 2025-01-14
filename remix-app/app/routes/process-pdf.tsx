import { json } from "@remix-run/node";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export const action = async ({ request }) => {
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
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const chunks = await textSplitter.createDocuments([textContent]);

  // Return the split chunks
  return json({ ok: true, chunks: chunks.map((chunk) => chunk.pageContent) });
};
