"use client"
import React from 'react';
import { useRouter } from 'next/router';
import useCoursesStore from '@/app/_contexts/courseContext';
import { ChapterData, CourseData, SubjectData } from '@/app/types/types';
import { usePathname } from 'next/navigation';
import Subject from '@/app/home/courseCatalog/_components/subject';

const SubjectListComponent: React.FC = () => {
  // const router = useRouter(); // Initialize the router

  const { courses } = useCoursesStore();
  const chapterId = usePathname().split("/")[usePathname().split("/").length - 2];
  const courseId = usePathname().split("/")[usePathname().split("/").length - 4];
  console.log(courseId);
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

export default SubjectListComponent;

