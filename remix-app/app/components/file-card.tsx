import { Card, CardContent } from "~/components/ui/card"
import { FileText, MoreVertical } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Button } from "~/components/ui/button"

interface FileCardProps {
  fileName: string
  uploadDate: string
}

export function FileCard({ fileName, uploadDate }: FileCardProps) {
  return (
    <Card className="group relative">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-primary/10 p-2">
            <FileText className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="font-medium leading-none">{fileName}</h3>
            <p className="text-sm text-muted-foreground">
              Uploaded on {uploadDate}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100"
              >
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* <DropdownMenuItem onClick={() => window.location.href =  }>View details</DropdownMenuItem> */}
              <DropdownMenuItem>Download</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  )
}

