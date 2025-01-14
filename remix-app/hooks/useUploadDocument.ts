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
    const user = useUser()

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

      // Step 2: Save metadata in Convex
      await createPdfFile({ storageId, fileName, id: uuid(), user: userId });

      // Step 3: Get file URL
      const fileUrl = await getFileUrl({ storageId });

      // Step 4: Process the file (split text into chunks)
      const res = await fetch("/process-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileUrl }),
      });
      const data = await res.json();

      // Step 5: Embed document chunks
      await embbedDocument({ chunks: data.chunks });

      toast.success("Successfully uploaded and processed the document");

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
