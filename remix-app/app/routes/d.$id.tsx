import { useParams } from '@remix-run/react';
import { api } from 'convex/_generated/api';
// import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'

import { useQuery } from 'convex/react';

import PdfViewer from '~/components/pdf-viewer';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '~/components/ui/resizable';

const Page = () => {
  // const { editor } = useCurrentEditor()
  const { id } = useParams();
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
         <h2>File Metadata</h2>
        <p><strong>File Name:</strong> {file.fileName}</p>
        <p><strong>User:</strong> {file.user}</p>
        <p><strong>Storage ID:</strong> {file.storageId}</p>
        <p><strong>ID:</strong> {file.id}</p>

        <p><strong>URL:</strong> <a href={file?.url} target="_blank" rel="noopener noreferrer">{file.url}</a></p>
        {/* <EditorView /> */}
        

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
