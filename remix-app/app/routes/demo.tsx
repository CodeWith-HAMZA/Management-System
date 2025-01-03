// File: routes/data-fetch.tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";



export const loader = async () => {
  console.log("server");

  const fileUrl = "https://cautious-rat-48.convex.cloud/api/storage/0ee0cf74-98d4-412c-9f89-9918c949c44c";
  const res = await fetch(fileUrl)
  const data = await res.blob()

  const loader = new WebPDFLoader(data);
  const docs = await loader.load();
  let textContentOfFile = '';

  docs.forEach((doc) => {
    textContentOfFile += doc.pageContent;
  });


  return json({ ok: true, textContentOfFile });
};
export default function DataFetchPage() {
  const data = useLoaderData<typeof loader>();
  // const [data, setData] = useState([]);
  console.log(data);
  return JSON.stringify(data);
}
