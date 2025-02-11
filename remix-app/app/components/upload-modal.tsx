"use client";

import React, { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import { useAction, useMutation } from "convex/react";
import { api } from "convex/_generated/api";
import { Loader } from "lucide-react";
import { uuid } from "~/lib/utils";
import { useUser } from "@clerk/remix";
import { toast } from "sonner";
import useUploadDocument from "~/../hooks/useUploadDocument";

interface UploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadModal({ open, onOpenChange }: UploadModalProps) {
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const user = useUser();
  const { uploadAndProcessDocument, loading } = useUploadDocument(() => {
    onOpenChange(false)
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !fileName || !user.user) return toast.error('Something Went Wrong');
    await uploadAndProcessDocument({
      selectedFile,
      fileName,
      userId: user.user?.id?.toString(),
    });
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
          <Button onClick={handleUpload} disabled={!selectedFile || !fileName || loading}>
            {loading ? <Loader className="animate-spin" /> : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
