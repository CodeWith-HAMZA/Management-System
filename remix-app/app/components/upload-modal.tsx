"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import { useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { Loader } from "lucide-react";
import { uuid } from "~/lib/utils";
import { useUser } from "@clerk/remix";

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadModal({ open, onOpenChange }: UploadModalProps) {
  const [fileName, setFileName] = useState("");
  const user = useUser();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const generateUploadURL = useMutation(api.fileStorage.generateUploadUrl);
  const createPdfFile = useMutation(api.fileStorage.createPdfFile);
  const getFileUrl = useMutation(api.fileStorage.getFileUrl);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Set the filename input to the file's name by default
      setFileName(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !fileName) return;

    try {
      const postUrl = await generateUploadURL();

      console.log(postUrl);
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": selectedFile.type },
        body: selectedFile,
      });

      const { storageId } = await result.json();
      console.log(storageId);

      createPdfFile({
        storageId,
        fileName,
        id: uuid(),
        user: user.user?.id?.toString() || uuid(),
      });

      // await sendImage({ storageId, author: name });

      console.log("Uploading:", {
        storageId: storageId,
        fileName: fileName,
      });

      // Close the modal after successful upload
      onOpenChange(false);

      // Reset the form
      setFileName("");
      setSelectedFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input
              type="text"
              placeholder="File name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="flex gap-2 sm:space-x-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!selectedFile || !fileName}>
            {true && <Loader className="animate-spin" />}
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
