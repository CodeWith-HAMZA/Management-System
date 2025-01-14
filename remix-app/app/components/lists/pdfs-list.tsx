import React from "react";
import { FileCard } from "../file-card";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { useUser } from "@clerk/remix";
import { Loader, Loader2 } from "lucide-react";

const PdfList = () => {
  // get files
  const user = useUser();
  const q = useQuery(api.fileStorage.getFiles, {
    user: user.user?.id,
  });
  console.log(q);

  if (!q ) {
    return (
      <div className="pt-8">
        <Loader className="text-gray-500 size-6 animate-spin mx-auto" />;
      </div>
    );
  }


  // return JSON.stringify(user)
  return (
    <div className="grid gap-4 " style={{overflow: 'scroll', height: '72vh'}}>
      {q?.map((file) => (
        <FileCard
          key={file._id}
          file={file}
          fileName={file.fileName}
          uploadDate={Date(file._creationTime)}
        />
      ))}
    </div>
  );
};

export default PdfList;
