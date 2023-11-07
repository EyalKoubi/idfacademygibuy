"use client"
import React from 'react';
import { ContentData } from '@/app/types/types';

type VideoLinkListProps = {
    contents: ContentData[] | undefined;
    onVideoSelect: (content: ContentData) => void;
};

const videoLinkList: React.FC<VideoLinkListProps> = ({ contents, onVideoSelect }) => {
    return (
        <div >
            {contents?.map((content, index) => (
                   <div className="flex justify-center">

                {/* need to fix that will be component with design and prephoto of the file  */}
                <p key={index} onClick={() => onVideoSelect(content)} style={{ cursor: 'pointer' }}>
                    {content.file_name}
                </p>
                   </div>
            ))}
        </div>
    );
};

export default videoLinkList;
