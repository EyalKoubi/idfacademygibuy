"use client"
import React from 'react';
import { useRouter } from 'next/router';
import useCoursesStore from '@/app/_contexts/courseContext';
import { ChapterData, CourseData, SubjectData } from '@/app/types';
import { usePathname } from 'next/navigation';
import Subject from '@/app/home/myCourses/_components/subject';

interface SubjectListProps{
  params:{
    courseid:string;
    chapterid:string;
  }
}
const SubjectList: React.FC<SubjectListProps>= (props:SubjectListProps) => {
  // const router = useRouter(); // Initialize the router

  const { courses } = useCoursesStore();
  const chapterId = props.params.chapterid;
  const courseId = props.params.courseid;
  // Find the course with the specified ID
  const courseToPresent = courses.find((course) => course.id === courseId);

  // Get the subjects for the selected course, or an empty array if the course is not found
  const subjectsToPresent = courseToPresent?.chapters?.find((chapter)=>chapter.id===chapterId)?.subjects;

  const navigateToSubject = (subjectId: string) => {
    // Navigate to the subject page using the subjectId and courseId if needed
    // For example: router.push(`/courses/${courseId}/subjects/${subjectId}`);
  };

  return (
    <div>
      {subjectsToPresent?.map((subject: SubjectData) => (
        <Subject subject={subject} chapterid={chapterId} courseid={courseId}/>
      ))}
    </div>
  );
};

export default SubjectList;

