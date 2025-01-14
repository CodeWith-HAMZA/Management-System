import React from 'react'

const PdfViewer = ({file}) => {
  return (
     <iframe
      src={file.url}
      width="100%"
      height="100%"
      style={{ border: 'none' }}
      title="PDF Viewer"
    />
   )
}

export default PdfViewer
