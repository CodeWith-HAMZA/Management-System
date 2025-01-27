import { useParams } from '@remix-run/react';
import { api } from 'convex/_generated/api';
// import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'

import { useQuery } from 'convex/react';

import PdfViewer from '~/components/pdf-viewer';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '~/components/ui/resizable';
import EditorView from '~/components/editor-view';

const Page = () => {
  // const { editor } = useCurrentEditor()
  const { id } = useParams();
  // @ts-ignore
  const files = useQuery(api.fileStorage.getFileById, { id });
  
    
  if (!files || !id) {
    return <p>Loading...</p>; 
  }
  const file = files.at(0);

  if (!file?.url) {
    // return JSON.stringify(files.at(0)?.url)
    return <p>No file URL found.</p>;
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <ResizablePanelGroup direction="horizontal">
      <ResizablePanel>
         <EditorView file={file} fileId={file.id} title={file?.fileName} />
        

      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel> 
          <PdfViewer file={file}/>
       
      </ResizablePanel>
    </ResizablePanelGroup>
      {/* Left half: PDF viewer */}
     
      {/* Right half: File metadata */}
       
    </div>
  );
};

export default Page;
