import { useState } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { toast } from "sonner";
import { useUser } from "@clerk/remix";
import { uuid } from "~/lib/utils";

interface UploadParams {
  selectedFile: File;
  fileName: string;
  userId: string;
}

export default function useUploadDocument(onComplete: () => void) {
  const [loading, setLoading] = useState(false);
  const generateUploadURL = useMutation(api.fileStorage.generateUploadUrl);
  const createPdfFile = useMutation(api.fileStorage.createPdfFile);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  const embbedDocument = useAction(api.actions.ingest);
    // const user = useUser()

  const uploadAndProcessDocument = async ({ selectedFile, fileName, userId }: UploadParams) => {
    setLoading(true);

    try {
      // Step 1: Generate upload URL
      const postUrl = await generateUploadURL({});
      const response = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": selectedFile.type },
        body: selectedFile,
      });
      const {storageId} = await response.json()

      // console.log(storageId, 'shaddu')
      // setLoading(false);
      // return;
      const fileId = uuid();
      // Step 2: Save metadata in Convex (pdfs)
      const createdPdf =  await createPdfFile({ storageId, fileName, id: fileId , user: userId });

      // Step 3: Get file URL
      const fileUrl = await getFileUrl({ storageId });

      // Step 4: Process the file (split text into chunks (meaning array of sub strings)) eg. "how are you" -> ["how ", "are you"]
      const res = await fetch("/process-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileUrl }),
      });
      const data = await res.json();

      console.log(data, createdPdf,' data')

       
      // Step 5: Embed document chunks into vector store
    const resp  =  await embbedDocument({ chunks: data.chunks, fileId:fileId, title: 'Sample Doc Title'});
    console.log(resp, ' res')

      toast.success("Successfully uploaded and processed the document");

      // success cb
      onComplete(); 
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload and process the document");
    } finally {
      setLoading(false);
    }
  };

  return { uploadAndProcessDocument, loading };
}
