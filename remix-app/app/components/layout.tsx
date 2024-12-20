import { Button } from "~/components/ui/button"
import { ScrollArea } from "~/components/ui/scroll-area"
import { Upload, Briefcase, Crown } from 'lucide-react'
 import { Progress } from "~/components/ui/progress"
import { useState } from "react"
import { UploadModal } from "./upload-modal"
import { Link } from "@remix-run/react"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  return (
    <div className="grid lg:grid-cols-[240px_1fr] h-screen">
      <div className="border-r bg-background">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <span className="text-xl">AI Notes</span>
            </Link>
          </div>
          <div className="p-4">
            <Button 
              className="w-full justify-start gap-2" 
              size="lg"
              onClick={() => setIsUploadModalOpen(true)}
            >
              <Upload className="w-4 h-4" />
              Upload PDF
            </Button>
          </div>
          <ScrollArea className="flex-1 px-2">
            <div className="space-y-1 p-2">
              <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                <Link to="/workspace">
                  <Briefcase className="w-4 h-4" />
                  Workspace
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2" asChild>
                <Link to="/upgrade">
                  <Crown className="w-4 h-4" />
                  Upgrade
                </Link>
              </Button>
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">2 / 5 PDFs uploaded</span>
                <span className="font-medium">40%</span>
              </div>
              <Progress value={40} className="h-2" />
              <p className="text-xs text-muted-foreground text-right">3 credits remaining</p>
            </div>
          </div>
        </div>
      </div>
      <main className="flex flex-col h-screen">
        {children}
      </main>
      <UploadModal 
        open={isUploadModalOpen} 
        onOpenChange={setIsUploadModalOpen}
      />
    </div>
  )
}

