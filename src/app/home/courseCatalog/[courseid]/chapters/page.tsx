"use client"
import React from 'react';
import { useRouter } from "next/navigation";
import useCoursesStore from '@/app/_contexts/courseContext';
import { ChapterData, CourseData } from '@/app/types/types';

const ParagraphListComponent: React.FC = () => {
  // const router =  useRouter();
  // const { courseid } = router.query;
  const { courses } = useCoursesStore();
  const courseToPresent = courses.find(course => course.id === "6d018ae2-e67e-4167-8926-4f216c7679e0");

  const chaptersToPresent = courseToPresent ? courseToPresent.chapters : [];


  const navigateToSubjects = (chapterId: string) => {
  };

  return (
    <div>
      {chaptersToPresent.map((chapter: ChapterData) => (
        <p key={chapter.id} onClick={() => navigateToSubjects(chapter.id)} style={{ cursor: 'pointer' }}>
          {chapter.name}
        </p>
      ))}
    </div>
  );
};

export default ParagraphListComponent;
