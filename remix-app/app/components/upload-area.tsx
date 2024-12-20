"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload } from 'lucide-react'
import { cn } from "~/lib/utils"

export function UploadArea() {
  const [isDragging, setIsDragging] = useState(false)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle file upload here
    console.log(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    },
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false)
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-200",
        "flex flex-col items-center justify-center p-12 text-center",
        isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
      )}
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-1">Drop your PDF here</h3>
      <p className="text-sm text-muted-foreground">or click to browse files</p>
    </div>
  )
}

