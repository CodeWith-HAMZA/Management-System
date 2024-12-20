import { Layout } from "~/components/layout"
import { UploadArea } from "~/components/upload-area"
import { FileCard } from "~/components/file-card"

export default function WorkspacePage() {
  return (
    <Layout>
      <div className="flex-1 p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Workspace</h1>
            <p className="text-muted-foreground">
              Upload and manage your PDF files
            </p>
          </div>
          
          {/* <UploadArea /> */}
          
          <div className="grid gap-4">
            <FileCard 
              fileName="Research Paper.pdf"
              uploadDate="Dec 17, 2023"
            />
            <FileCard 
              fileName="Meeting Notes.pdf"
              uploadDate="Dec 16, 2023"
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}

