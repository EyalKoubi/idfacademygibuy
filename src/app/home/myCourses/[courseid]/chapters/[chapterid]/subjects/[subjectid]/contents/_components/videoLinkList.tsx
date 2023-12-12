"use client"
import React from 'react';
import { ContentData, ContentItemProgress, ContentProgress } from '@/app/types';

interface VideoLinkListProps  {
    contents: ContentData[] | undefined;
    onVideoSelect : (content: ContentData,contentStatus:ContentItemProgress) => void;
    contentsStatus:ContentItemProgress[]|undefined;
}
const videoLinkList: React.FC<VideoLinkListProps> = ({ contents, onVideoSelect, contentsStatus}) => {
    // Define a default contentStatus
    const defaultContentStatus = { contentId: '', watched: false };

    return (
        <div>
            <table>
            {contents?.map((content, index) => {
                // Find content status or use the default one
                const contentStatus = contentsStatus?.find(cs => cs.contentId === content.id) || defaultContentStatus;

                return (
                    <div className="flex justify-center border w-36 border-black" key={index}>
                        <td>
                            <p onClick={() => onVideoSelect(content, contentStatus)} style={{ cursor: 'pointer' }}>
                                {content.file_name}
                            </p>
                            <input
                                type="checkbox"
                                checked={contentStatus.watched}
                                readOnly 
                            />
                        </td>
                    </div>
                );
            })}
            </table>
        </div>
    );
};

export default videoLinkList;
