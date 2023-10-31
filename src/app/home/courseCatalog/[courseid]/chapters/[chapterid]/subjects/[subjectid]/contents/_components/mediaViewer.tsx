"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ContentData } from '@/app/types/types';

type MediaViewerProps = {
    content: ContentData;
};

const mediaViewer: React.FC<MediaViewerProps> = ({ content }) => {
    const [mediaSrc, setMediaSrc] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');


    useEffect(() => {
        const fetchMedia = async () => {
          try {
            const response = await axios.get(`/api/getFile`);
            console.log(response.data.data)
            const arrayBuffer = new Uint8Array(response.data.data); // Convert to Uint8Array
            const blob = new Blob([arrayBuffer], { type: 'video/mp4' }); // Convert to Blob
            const url = URL.createObjectURL(blob);
            //URL.revokeObjectURL()
            setMediaSrc(url);
            setLoading(false);
         } catch (error) {
            console.error('Error fetching media:', error);
            setError('Failed to load media.');
            setLoading(false);
          }
        };
    
        fetchMedia();
      }, [content]);
  //if (loading) return <p>Loading...</p>;
 // if (error) return <p>Error: {error}</p>;

//   const fileExtension = content.file_name.split('.').pop()?.toLowerCase();
  const fileExtension='mp4'
  switch (fileExtension) {
     case 'mp4':
      return <video controls><source src={mediaSrc} type="video/mp4" /></video>;
//     // Add cases for other file types...
    default:
      return <p>Your browser does not support this file type.</p>;
     }
};

export default mediaViewer;
