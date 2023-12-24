import React from 'react';
import { ContentData, ContentItemProgress, EnhancedContentData } from '@/app/types';

interface VideoListItemProps {
  content: EnhancedContentData;
  contentStatus: ContentItemProgress;
  onVideoSelect: (content: ContentData, contentStatus: ContentItemProgress) => void;
}

const ItemVideoMenu: React.FC<VideoListItemProps> = ({ content, contentStatus, onVideoSelect }) => {
  return (
    <div
      className="flex justify-between items-center min-w-full bg-gray-100 p-2 rounded-md my-2 cursor-pointer hover:bg-gray-300 transition duration-200"
      onClick={() => onVideoSelect(content, contentStatus)}
    >
      <div className="flex items-center">
        <img
          src={content.mediaSrc} // Use the media URL received from the API
          alt={content.file_name}
          className="w-16 h-16 rounded mr-2"
        />
        <div className="flex flex-col">
          <p className="text-gray-800">{content.comments}</p>
        </div>
      </div>
      <input type="checkbox" checked={contentStatus.watched} readOnly className="ml-2" />
    </div>
  );
};

export default ItemVideoMenu;