import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ContentData } from '@/app/types/types';
interface MediaViewerProps{
  content: ContentData 

}
const MediaViewer: React.FC<MediaViewerProps> = ({ content }) => {
    const [mediaSrc, setMediaSrc] = useState('');
    const [mediaType, setMediaType] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const cleanup = () => {
        if (mediaSrc) {
            URL.revokeObjectURL(mediaSrc);
        }
    };

    const getMimeType = (extension: string | undefined) => {
        if (!extension) return '';

        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'svg'];
        const videoExtensions = ['mp4', 'webm', 'ogv'];
        const audioExtensions = ['mp3', 'wav', 'ogg'];
        const textExtensions = ['txt', 'csv', 'log'];

        if (imageExtensions.includes(extension.toLowerCase())) return `image/${extension.toLowerCase()}`;
        if (videoExtensions.includes(extension.toLowerCase())) return `video/${extension.toLowerCase()}`;
        if (audioExtensions.includes(extension.toLowerCase())) return `audio/${extension.toLowerCase()}`;
        if (textExtensions.includes(extension.toLowerCase())) return 'text/plain';

        return 'application/octet-stream';
    };

    useEffect(() => {
        setLoading(true);
        if (content) {
            const fetchMedia = async () => {
                try {
                    // Fetch the pre-signed URL from the API
                    const response = await axios.get(`/api/getFile/${content.id}`);
                    const presignedUrl = response.data.url; // Assuming the API sends back an object with the url
                    
                    const fileExtension = content.file_name.split('.').pop();
                    const mimeType = getMimeType(fileExtension);

                    // Directly use the pre-signed URL, no need for conversion
                    setMediaSrc(presignedUrl);
                    setMediaType(mimeType);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching media:', error);
                    setError('Failed to load media.');
                    setLoading(false);
                }
            };
            fetchMedia();
            return () => {
                cleanup();
            };
        }
    }, [content]);

   
    const renderLoading = () => (
        <div className="text-center text-white">Loading...</div>
      );
    
      const renderError = () => (
        <div className="text-center text-red-500">{error}</div>
      );
    
      const renderMedia = () => {
        if (loading) return renderLoading();
        if (error) return renderError();
    
        switch (true) {
          case mediaType.startsWith('image'):
            return <img className="max-w-full max-h-full object-contain" src={mediaSrc} alt={content.file_name} />;
          case mediaType.startsWith('video'):
            return (
              <video className="max-w-full max-h-full object-contain" controls>
                <source src={mediaSrc} type={mediaType} />
                Your browser does not support the video tag.
              </video>
            );
          case mediaType.startsWith('audio'):
            return (
              <audio className="w-full" controls>
                <source src={mediaSrc} type={mediaType} />
                Your browser does not support the audio element.
              </audio>
            );
          case mediaType === 'text/plain':
            return <a className="text-white bg-black" href={mediaSrc} download>{`Download Text File ${content.file_name}`}</a>;
          default:
            return <a className="text-white bg-black" href={mediaSrc} download>{`Download File ${content.file_name}`}|</a>;
        }
      };
    
      return (
        <div className="w-[500px] h-[500px] overflow-hidden flex justify-center items-center">
          {renderMedia()}
        </div>
      );
    };
    
    export default MediaViewer;

