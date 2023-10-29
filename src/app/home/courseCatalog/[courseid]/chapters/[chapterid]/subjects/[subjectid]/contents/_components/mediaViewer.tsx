import { ContentData } from '@/app/types/types';
import React from 'react';

type MediaViewerProps = {
  content:ContentData|undefined;
  fileUrl: string;
};

const MediaViewer: React.FC<MediaViewerProps> = ({ content,fileUrl }) => {
  const fileExtension = content?.file_name.split('.').pop()?.toLowerCase();
  console.log(fileUrl)
  console.log(fileExtension)
  switch (fileExtension) {
    case 'mp4':
      return <video controls><source src={fileUrl} type="video/mp4" /></video>;
    case 'mp3':
      return <audio controls><source src={fileUrl} type="audio/mpeg" /></audio>;
    case 'pdf':
      return <iframe src={fileUrl} width="100%" height="500" title="PDF Viewer"></iframe>;
    case 'txt':
      return <a href={fileUrl} download>Download TXT</a>;
    default:
      return <p>Your browser does not support this file type.</p>;
  }
};

export default MediaViewer;
