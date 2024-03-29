import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ContentData, ContentItemProgress, EnhancedContentData } from '@/app/types';
import { generateVideoImageThumbnail, getMimeType } from '@/utils/filesUtils';
import ItemVideoMenu from './itemVideoMenu';

interface VideoLinkListProps {
  contents: ContentData[] | undefined;
  onVideoSelect: (content: ContentData, contentStatus: ContentItemProgress) => void;
  contentsStatus: ContentItemProgress[] | undefined;
  subjectTitleName: string | undefined;
}

const VideoLinkList: React.FC<VideoLinkListProps> = ({
  contents,
  onVideoSelect,
  contentsStatus,
  subjectTitleName,
}) => {
  const defaultContentStatus = { contentId: '', watched: false };
  const [contentData, setContentData] = useState<EnhancedContentData[]>([]);

  useEffect(() => {
    const fetchMediaInfo = async (content: ContentData) => {
      try {
        const response = await axios.get(`/api/getFile/${content.id}`);
        let presignedUrl = response.data.url;

        const fileExtension = content.file_name.split('.').pop();
        const mimeType = getMimeType(fileExtension);

        if (mimeType.startsWith('video')) {
          presignedUrl = await generateVideoImageThumbnail(presignedUrl);
        }
        console.log(!contentData.some((updatedContent) => updatedContent.id === content.id))
        
          const updatedContent = {
            ...content,
            mediaSrc: presignedUrl,
            mediaType: mimeType,
          };

          // Update the contentData state
          setContentData((prevContentData) => {
            if (!prevContentData.some((content) => content.id === updatedContent.id)) {
              return [ updatedContent,...prevContentData];
            }
            return prevContentData;
          });
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };
    console.log(contents)
    if (contents) {
      contents.forEach((content) => {
        console.log(content)
        fetchMediaInfo(content);
      });
    }

  }, []);
  useEffect(()=>{console.log(contentData)},[contentData])

  return (
    <div className='min-w-full'>
      <section>
        <p className="bg-gray-300 p-2 rounded">{subjectTitleName}</p>
      </section>
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        <table>
          <tbody>
            {contentData?.map((content, index) => {
              const contentStatus =
                contentsStatus?.find((cs) => cs.contentId === content.id) || defaultContentStatus;

              return (
                <tr key={index}>
                  <td>
                    <ItemVideoMenu content={content} contentStatus={contentStatus} onVideoSelect={onVideoSelect} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default VideoLinkList;
