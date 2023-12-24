"use client"
import React from 'react';
import useCoursesStore from '@/app/_contexts/courseContext';
import { ChapterData, CourseData } from '@/app/types';
import Chapter from '../../_components/chapter';
import useUserStore from '@/app/_contexts/userContext';
interface ChapterListProps{
  params:{
    courseid:string;
  }
}
const ChapterList: React.FC<ChapterListProps> = (props:ChapterListProps) => {
  const { courses } = useCoursesStore();
  
  const courseid =props.params.courseid;
  const courseToPresent = courses.find((course) => course.id === courseid);
  const chaptersToPresent = courseToPresent ? courseToPresent.chapters : [];
  return (
    <div className='flex flex-col'>
      {chaptersToPresent?.map((chapter: ChapterData) => (
      <Chapter chapter={chapter} courseid={courseid}/>
      ))}
    </div>
  );
};

export default ChapterList;
