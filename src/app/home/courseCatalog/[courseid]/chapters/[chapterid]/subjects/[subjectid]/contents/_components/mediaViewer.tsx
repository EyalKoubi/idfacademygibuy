import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ContentData } from '@/app/types/types';

const MediaViewer: React.FC<{ content: ContentData }> = ({ content }) => {
    const [mediaSrc, setMediaSrc] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (content) {
            const fetchMedia = async () => {
                try {
                    const response = await axios.get(`/api/getFile`);
                    const base64 = response.data.file; // Assuming 'file' is the key for the base64 data

                    // Convert base64 to blob
                    const byteCharacters = atob(base64);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                        byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: 'video/mp4' });

                    const url = URL.createObjectURL(blob);
                    setMediaSrc(url);
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <video controls>
            <source src={mediaSrc} type="video/mp4" />
            Your browser does not support this file type.
        </video>
    );
};

export default MediaViewer;
