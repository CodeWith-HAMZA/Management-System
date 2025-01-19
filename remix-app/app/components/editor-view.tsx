'use client'

import { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Image from '@tiptap/extension-image'
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { Slider } from "~/components/ui/slider"
import { Switch } from "~/components/ui/switch"
import { Label } from "~/components/ui/label"
import { Bold, Italic, Strikethrough, Code, List, ListOrdered, CheckSquare, Heading1, Heading2, Heading3, Quote, Undo, Redo, AlignLeft, AlignCenter, AlignRight, TableIcon, ImageIcon, Link, Unlink, Maximize, Minimize, Share2, Save, FileText, Settings, Moon, Sun, Palette, Stars } from 'lucide-react'
import { useAction } from 'convex/react'
import { api } from 'convex/_generated/api'
 
type Props  = {
  title: string;
  fileId: string;
}
interface MenuBarProps extends Props  {
  editor: any, isFullScreen: boolean, toggleFullScreen: () => void, isDarkMode: boolean, toggleDarkMode: () => void

}
const MenuBar = ({ editor,fileId,title, isFullScreen, toggleFullScreen, isDarkMode, toggleDarkMode }: MenuBarProps) => {
  const [linkUrl, setLinkUrl] = useState('')
  const [query, setquery] = useState({
    text: '',
    isTextSelected: false,
  });
  const search = useAction(api.actions.search)

  useEffect(() => {
    if (editor) {
      const updateAskAIState = () => {
        const selection = editor.state.selection;
        const text = editor.state.doc.textBetween(selection.from, selection.to, ' ');
        const isTextSelected = !selection.empty && text.length > 8; // Check if text is selected
        console.log(text)
        // get selected text  
          setquery({text, isTextSelected});
        
      };
  
      editor.on('selectionUpdate', updateAskAIState); // Listen for selection changes
      return () => editor.off('selectionUpdate', updateAskAIState); // Cleanup listener
    }
  }, [editor]);
  

  if (!editor) {
    return null
  }
 async function handleSearchInVectorStore (){

  //  const response = await search({fileId, query: query.text})
   console.log('response', ' resp',fileId, query)
  }


  const addImage = () => {
    const url = window.prompt('Enter the URL of the image:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const setLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run()
      setLinkUrl('')
    }
  }

  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-1 mb-4 p-2 bg-background rounded-md shadow-sm transition-all duration-300 ease-in-out">
        <Tabs defaultValue="format" className="w-full">
          <TabsList className="mb-2">
            <TabsTrigger value="format">Format</TabsTrigger>
            <TabsTrigger value="insert">Insert</TabsTrigger>
            <TabsTrigger value="view">View</TabsTrigger>
          </TabsList>
          <TabsContent value="format" className="flex flex-wrap gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  disabled={!editor.can().chain().focus().toggleBold().run()}
                  className={editor.isActive('bold') ? 'bg-primary text-white' : ''}
                  size="icon"
                  variant="ghost"
                >
                  <Bold className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bold</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  disabled={!editor.can().chain().focus().toggleItalic().run()}
                  className={editor.isActive('italic') ? 'bg-primary text-white' : ''}
                  size="icon"
                  variant="ghost"
                >
                  <Italic className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Italic</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  disabled={!editor.can().chain().focus().toggleStrike().run()}
                  className={editor.isActive('strike') ? 'bg-primary text-white' : ''}
                  size="icon"
                  variant="ghost"
                >
                  <Strikethrough className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Strikethrough</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => editor.chain().focus().toggleCode().run()}
                  disabled={!editor.can().chain().focus().toggleCode().run()}
                  className={editor.isActive('code') ? 'bg-primary text-white' : ''}
                  size="icon"
                  variant="ghost"
                >
                  <Code className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Code</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={editor.isActive('heading', { level: 1 }) ? 'bg-primary text-white' : ''}
                  size="icon"
                  variant="ghost"
                >
                  <Heading1 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Heading 1</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={editor.isActive('heading', { level: 2 }) ? 'bg-primary text-white' : ''}
                  size="icon"
                  variant="ghost"
                >
                  <Heading2 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Heading 2</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                  className={editor.isActive('heading', { level: 3 }) ? 'bg-primary text-white' : ''}
                  size="icon"
                  variant="ghost"
                >
                  <Heading3 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Heading 3</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={editor.isActive('bulletList') ? 'bg-primary text-white' : ''}
                  size="icon"
                  variant="ghost"
                >
                  <List className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Bullet List</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  className={editor.isActive('orderedList') ? 'bg-primary text-white' : ''}
                  size="icon"
                  variant="ghost"
                >
                  <ListOrdered className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Ordered List</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => editor.chain().focus().toggleTaskList().run()}
                  className={editor.isActive('taskList') ? 'bg-primary text-white' : ''}
                  size="icon"
                  variant="ghost"
                >
                  <CheckSquare className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Task List</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => editor.chain().focus().toggleBlockquote().run()}
                  className={editor.isActive('blockquote') ? 'bg-primary text-white' : ''}
                  size="icon"
                  variant="ghost"
                >
                  <Quote className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Blockquote</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => editor.chain().focus().setTextAlign('left').run()} size="icon" variant="ghost">
                  <AlignLeft className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Align Left</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => editor.chain().focus().setTextAlign('center').run()} size="icon" variant="ghost">
                  <AlignCenter className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Align Center</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={() => editor.chain().focus().setTextAlign('right').run()} size="icon" variant="ghost">
                  <AlignRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Align Right</TooltipContent>
            </Tooltip>
          </TabsContent>
          <TabsContent value="insert" className="flex flex-wrap gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
                  size="icon"
                  variant="ghost"
                >
                  <TableIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Insert Table</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={addImage} size="icon" variant="ghost">
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Insert Image</TooltipContent>
            </Tooltip>
            <div className="flex items-center gap-1">
              <Input
                type="text"
                placeholder="Enter URL"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="w-32 h-8 text-sm"
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={setLink} size="icon" variant="ghost">
                    <Link className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Set Link</TooltipContent>
              </Tooltip>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={() => editor.chain().focus().unsetLink().run()}
                  disabled={!editor.isActive('link')}
                  size="icon"
                  variant="ghost"
                >
                  <Unlink className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Unlink</TooltipContent>
            </Tooltip>
          </TabsContent>
          <TabsContent value="view" className="flex flex-wrap gap-1 items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={toggleFullScreen} size="icon" variant="ghost">
                  {isFullScreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isFullScreen ? 'Exit Full Screen' : 'Full Screen'}</TooltipContent>
            </Tooltip>
            <div className="flex items-center space-x-2">
              <Switch id="dark-mode" checked={isDarkMode} onCheckedChange={toggleDarkMode} />
              <Label htmlFor="dark-mode">{isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}</Label>
            </div>
          </TabsContent>
        </Tabs>
        <div className="flex gap-1 mt-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => editor.chain().focus().undo().run()} size="icon" variant="ghost">
                <Undo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => editor.chain().focus().redo().run()} size="icon" variant="ghost">
                <Redo className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>
        <Button onClick={handleSearchInVectorStore} disabled={!query.isTextSelected}

 className='flex gap-2 transition-all mb-4' size={'lg'}>
    <span>
      Ask AI
    </span>
    <Stars  />
  </Button>
        </div>
      </div>
    </TooltipProvider>
  )
}
export default function DocumentEditor({title, fileId}:Props) {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [documentName, setDocumentName] = useState(title || "Untitled Document")
  const [fontSize, setFontSize] = useState(16)

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullScreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullScreen(false)
      }
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {

      if (e.key === 'F11') {
        e.preventDefault()
        toggleFullScreen()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit,
      Highlight,
      TaskList,
      TaskItem,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image,
    ],
    content: '<h1>Welcome to Your Document</h1><p>Start typing to create your content...</p>',
  })

  useEffect(() => {
    if (editor) {
      editor.setOptions({
        editorProps: {
          attributes: {
            class: `prose max-w-none dark:prose-invert transition-all duration-300 ease-in-out ${
              isDarkMode ? 'dark' : ''
            }`,
            style: `font-size: ${fontSize}px`,
          },
        },
      })
    }
  }, [editor, isDarkMode, fontSize])

  return (
    <div className={`flex flex-col h-screen ${isDarkMode ? 'dark' : ''}`}>
      <header className="flex items-center justify-between p-2 bg-background border-b transition-colors duration-300 ease-in-out">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <Input
            type="text"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            className="text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-0"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Share Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Copy Link</DropdownMenuItem>
              <DropdownMenuItem>Email</DropdownMenuItem>
              <DropdownMenuItem>Invite Collaborators</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Editor Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="px-2 py-1.5">
                <Label htmlFor="font-size">Font Size</Label>
                <Slider
                  id="font-size"
                  min={12}
                  max={24}
                  step={1}
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                  className="w-full"
                />
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={toggleDarkMode}>
                <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span>Toggle Theme</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-grow overflow-auto p-4 bg-background transition-colors duration-300 ease-in-out">
        <MenuBar fileId={fileId} title={documentName} editor={editor} isFullScreen={isFullScreen} toggleFullScreen={toggleFullScreen} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        <EditorContent editor={editor} className="prose dark:prose-invert max-w-none transition-all duration-300 ease-in-out" />
      </main>
    </div>
  )
}

