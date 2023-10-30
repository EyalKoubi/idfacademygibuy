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
        const formData = new FormData();
        formData.append("fileName", content.id);

        axios.post("/api/getFile", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            responseType: 'blob',
        })
        .then(response => {
            const blob = new Blob([response.data], { type: response.headers['content-type'] });
            const url = URL.createObjectURL(blob);
            setMediaSrc(url);
            setLoading(false);
        })
        .catch(error => {
            console.error("Error in API call:", error);
            setError('Failed to load media.');
            setLoading(false);
        });
    }, [content]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const fileExtension = content.file_name.split('.').pop()?.toLowerCase();

    switch (fileExtension) {
        case 'mp4':
            return <video controls><source src={mediaSrc} type="video/mp4" /></video>;
        case 'mp3':
            return <audio controls><source src={mediaSrc} type="audio/mpeg" /></audio>;
        case 'pdf':
            return <iframe src={mediaSrc} width="100%" height="500" title="PDF Viewer"></iframe>;
        case 'txt':
            return <a href={mediaSrc} download>Download TXT</a>;
        default:
            return <p>Your browser does not support this file type.</p>;
    }
};

export default mediaViewer;
