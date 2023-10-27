"use client"
import React from 'react';
import useCoursesStore from '@/app/_contexts/courseContext';
import { ChapterData, CourseData } from '@/app/types/types';
// import { useRouter } from 'next/navigation';
import { usePathname } from "next/navigation";
import Chapter from '../../_components/chapter';

const ChapterList: React.FC = () => {
  const { courses } = useCoursesStore();
  // const router = useRouter();
  const courseid =
    usePathname().split("/")[usePathname().split("/").length - 2];
  console.log(courseid);

  // Now, you can use the `courseid` in your logic to find the course
  const courseToPresent = courses.find((course) => course.id === courseid);

  const chaptersToPresent = courseToPresent ? courseToPresent.chapters : [];


  return (
    <div>
      {chaptersToPresent.map((chapter: ChapterData) => (
      <Chapter chapter={chapter} courseid={courseid}/>
      ))}
    </div>
  );
};

export default ChapterList;
