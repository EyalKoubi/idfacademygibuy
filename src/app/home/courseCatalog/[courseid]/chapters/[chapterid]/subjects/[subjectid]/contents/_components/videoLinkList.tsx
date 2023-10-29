import { ContentData } from '@/app/types/types';
import React from 'react';

type VideoLinkListProps = {
  contents: ContentData[]|undefined;
  onVideoSelect: (url: string,content:ContentData) => void;
};

const VideoLinkList: React.FC<VideoLinkListProps> = ({ contents, onVideoSelect }) => {
  return (
    <div>
      {contents?.map((content, index) => (
        <p key={index} onClick={() => onVideoSelect(`http://localhost:3000/api/getFile?fileName=${content.id}`,content)} style={{ cursor: 'pointer' }}>
          Video {index + 1}
        </p>
      ))}
    </div>
  );
};

export default VideoLinkList;
