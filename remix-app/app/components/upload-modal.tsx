"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog"
import { useMutation } from "convex/react"
import { api } from "convex/_generated/api"

interface UploadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UploadModal({ open, onOpenChange }: UploadModalProps) {
  const [fileName, setFileName] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const generateUploadURL = useMutation(api.fileStorage.generateUploadUrl)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      // Set the filename input to the file's name by default
      setFileName(file.name.replace(/\.[^/.]+$/, ""))
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !fileName) return

    try {
      // Here you would implement your file upload logic
      const postUrl = await generateUploadURL();
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type":selectedFile.type },
        body: selectedFile,
      });
      const { storageId } = await result.json();
      // await sendImage({ storageId, author: name });
u

      console.log("Uploading:", { file: selectedFile, name: fileName })
      
      // Close the modal after successful upload
      onOpenChange(false)
      
      // Reset the form
      setFileName("")
      setSelectedFile(null)
    } catch (error) {
      console.error("Upload failed:", error)
    }
  }

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
        <DialogFooter className="flex space-x-2 sm:space-x-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!selectedFile || !fileName}>
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

