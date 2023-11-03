"use client"
import React, { useState } from 'react';
import MediaViewer from './_components/mediaViewer';
import VideoLinkList from './_components/videoLinkList';
import useCoursesStore from '@/app/_contexts/courseContext';
import { usePathname } from 'next/navigation';
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
  const contentsToPresent = courseToPresent?.chapters?.find(chapter => chapter.id === chapterId)?.subjects.find(subject => subject.id === subjectId)?.contents;

  const [currContent, setCurrContent] = useState<ContentData | undefined>(contentsToPresent?.[0]);

  const onVideoSelect = (content: ContentData) => {
    console.log('Selected Content:', content);
    setCurrContent(content);
  };

  return (
    <div className="flex justify-between items-center h-screen">
      <div className="flex-1 flex justify-center items-center bg-black">
        {currContent ? (
          <div className="max-w-4xl max-h-[90vh] w-full h-full flex justify-center items-center">
            <MediaViewer content={currContent} />
          </div>
        ) : (
          <div className="text-white">
            No content selected or available
          </div>
        )}
      </div>
      <div className="flex-1 hidden md:block">
        <VideoLinkList contents={contentsToPresent} onVideoSelect={onVideoSelect} />
      </div>
    </div>
  );
};

export default ContentList;
