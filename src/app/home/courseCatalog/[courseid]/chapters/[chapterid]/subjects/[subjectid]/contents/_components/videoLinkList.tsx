import React from 'react';
import { ContentData } from '@/app/types/types';

type VideoLinkListProps = {
    contents: ContentData[] | undefined;
    onVideoSelect: (content: ContentData) => void;
};

const videoLinkList: React.FC<VideoLinkListProps> = ({ contents, onVideoSelect }) => {
    return (
        <div>
            {contents?.map((content, index) => (
                <p key={index} onClick={() => onVideoSelect(content)} style={{ cursor: 'pointer' }}>
                    Video {index + 1}
                </p>
            ))}
        </div>
    );
};

export default videoLinkList;
