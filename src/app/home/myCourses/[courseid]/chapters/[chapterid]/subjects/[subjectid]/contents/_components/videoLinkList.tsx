"use client"
import React from 'react';
import { ContentData } from '@/app/types';

interface VideoLinkListProps  {
    contents: ContentData[] | undefined;
    onVideoSelect: (content: ContentData) => void;
}
const videoLinkList: React.FC<VideoLinkListProps> = ({ contents, onVideoSelect }) => {
    return (
        <div >
            <table>
            {contents?.map((content, index) => (
                   <div className="flex justify-center border w-36 border-black">
                    <td  className=''>
                {/* need to fix that will be component with design and prephoto of the file  */}
                <p key={index} onClick={() => onVideoSelect(content)} style={{ cursor: 'pointer' }}>
                    {content.file_name}
                </p>
                   </td>
                   </div>
            ))}
            </table>
        </div>
        
    );
};

export default videoLinkList;
