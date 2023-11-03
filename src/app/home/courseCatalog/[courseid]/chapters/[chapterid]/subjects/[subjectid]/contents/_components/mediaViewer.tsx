import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ContentData } from '@/app/types/types';

const MediaViewer: React.FC<{ content: ContentData }> = ({ content }) => {
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
                    const response = await axios.get(`/api/getPresignedUrl/${content.id}`);
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
        }
    }, [content]);

   
    
    const renderMedia = () => {
        switch (true) {
            case mediaType.startsWith('image'):
                return <img className="max-w-full max-h-full object-contain mx-auto" src={mediaSrc} alt={content.file_name} />;
            case mediaType.startsWith('video'):
                return (
                    <video className="max-w-full max-h-full object-contain mx-auto" controls>
                        <source src={mediaSrc} type={mediaType} />
                    </video>
                );
            case mediaType.startsWith('audio'):
                return (
                    <audio className="w-full" controls>
                        <source src={mediaSrc} type={mediaType} />
                    </audio>
                );
            case mediaType === 'text/plain':
                return <a className="text-white" href={mediaSrc} download>Download Text File</a>;
            default:
                return <a className="text-white" href={mediaSrc} download>Download File</a>;
        }
    };
    const renderMediaWithBackground = () => {
        return (
          <div className="bg-red-500 flex justify-center items-center w-full h-full">
            <div className="max-w-full max-h-full">
              {renderMedia()}
            </div>
          </div>
        );
      };
    return renderMediaWithBackground ();
};
export default MediaViewer;


