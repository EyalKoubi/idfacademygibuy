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
                    const response = await axios.get(`/api/getFile/${content.id}`);
                    const base64 = response.data.file;

                    const byteCharacters = atob(base64);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const fileExtension = content.file_name.split('.').pop();
                    const mimeType = getMimeType(fileExtension);

                    const blob = new Blob([byteArray], { type: mimeType });
                    const url = URL.createObjectURL(blob);

                    setMediaSrc(url);
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
        return cleanup;
    }, [content]);

    const renderMedia = () => {
        if (mediaType.startsWith('image')) {
            return <img src={mediaSrc} alt={content.file_name} />;
        } else if (mediaType.startsWith('video')) {
            return <video controls><source src={mediaSrc} type={mediaType} /></video>;
        } else if (mediaType.startsWith('audio')) {
            return <audio controls><source src={mediaSrc} type={mediaType} /></audio>;
        } else if (mediaType === 'text/plain') {
            return <a href={mediaSrc} download>Download Text File</a>;
        } else {
            return <a href={mediaSrc} download>Download File</a>;
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return renderMedia();
};

export default MediaViewer;
