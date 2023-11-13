"use client"
import React, { useState } from 'react';
import MediaViewer from './_components/mediaViewer';
import VideoLinkList from './_components/videoLinkList';
import useCoursesStore from '@/app/_contexts/courseContext';
import { ContentData } from '@/app/types/types';

interface ContentListProps {
  params: {
    courseid: string;
    chapterid: string;
    subjectid: string;
  };
}

const ContentList: React.FC<ContentListProps> = ({ params }) => {
  const { courses } = useCoursesStore();
  const subjectId = params.subjectid;
  const chapterId = params.chapterid;
  const courseId = params.courseid;

  const courseToPresent = courses.find(course => course.id === courseId);
  const contentsToPresent:ContentData[]|undefined = courseToPresent?.chapters?.find(chapter => chapter.id === chapterId)?.subjects.find(subject => subject.id === subjectId)?.contents;

  const [contentIndex, setContentIndex] = useState<number>(0);
  const [currContent, setCurrContent] = useState<ContentData | undefined>(contentsToPresent?.[0]);

  const onVideoSelect = (content: ContentData) => {
    console.log('Selected Content:', content);
    // Find the index of the selected content in the contentsToPresent array
    const newIndex = contentsToPresent?.findIndex((c) => c.id === content.id);
    // Check if a valid index is found
    if (typeof newIndex === 'number' && newIndex >= 0 &&contentsToPresent!==undefined) {
      setContentIndex(newIndex);
      setCurrContent(contentsToPresent[newIndex]); // No optional chaining needed, newIndex is a number
    }
  };
  
  const goToNextContent = () => {
    if (contentsToPresent && contentIndex < contentsToPresent.length - 1) {
      setContentIndex(contentIndex + 1);
      setCurrContent(contentsToPresent[contentIndex + 1]);
    }
  };

  const goToPreviousContent = () => {
    if (contentIndex > 0 &&contentsToPresent!==undefined) {
      setContentIndex(contentIndex - 1);
      setCurrContent(contentsToPresent[contentIndex - 1]);
    }
  };

  return (
    <div>
      <h1>תכנים</h1>
      <div className="flex justify-between items-center h-screen">
        <div className="flex-1 flex justify-center items-center bg-black">
          {currContent ? (
            <div className="flex justify-center items-center" style={{
              width: '500px',
              height: '500px',
              backgroundColor: 'grey', // Starting color
              borderRadius: '5%', // Makes it circular
              transition: 'background-color 0.1s ease-in-out', // Smooth transition for background color
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)', // A subtle shadow for depth
              overflow: 'hidden', // Ensures the content doesn't spill out
            }}>
              <MediaViewer content={currContent} />
            </div>
          ) : (
            <div className="text-white">
              No content selected or available
            </div>
          )}
        </div>
        <div className="flex justify-start  md:block" style={{width:'150px'}}>
          <VideoLinkList contents={contentsToPresent} onVideoSelect={onVideoSelect} />
        </div>
        <div>
        <button onClick={goToPreviousContent} disabled={contentIndex === 0}>
          Previous   
        </button>
        <button onClick={goToNextContent} disabled={!contentsToPresent || contentIndex === contentsToPresent.length - 1}>
          Next
        </button>
        </div>
      </div>
    </div>
  );
};

export default ContentList;