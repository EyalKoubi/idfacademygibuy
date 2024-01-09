"use client"
import React from 'react';
import useCoursesStore from '@/app/_contexts/courseContext';
import { ChapterData, CourseData } from '@/app/types';
import Chapter from '../../_components/chapter';
import useUserStore from '@/app/_contexts/userContext';
import { editTexts, presentCourseDetailTexts } from '@/HebrewStrings/Texts';
interface ChapterListProps{
  params:{
    courseid:string;
  }
}
const PresentCourseDetails: React.FC<ChapterListProps> = (props:ChapterListProps) => {
  const { courses } = useCoursesStore();
  
  const courseid =props.params.courseid;
  const courseToPresent = courses.find((course) => course.id === courseid);
  const chaptersToPresent = courseToPresent ? courseToPresent.chapters : [];
  return (
    <div className="flex flex-col">
  
      {courseToPresent && (
        <><span>{presentCourseDetailTexts.descripitonOfCourse}</span>
        <div className="w-[700px] h-[400px] max-h-full text-right">
          <div dangerouslySetInnerHTML={{ __html: courseToPresent.description }} />

        </div>
        <div>
          <span>{presentCourseDetailTexts.subscribeNum}</span>
          {courseToPresent.subscribe_num}
        </div>
        <div>
          <span>{presentCourseDetailTexts.rateOfCourse}</span>
          {courseToPresent.rate}
        </div>
                </>
      )}
      <br/>
      <span>{presentCourseDetailTexts.chaptersOfCourse}</span>
      <div className="flex flex-col">
        {chaptersToPresent?.map((chapter: ChapterData) => (
          <Chapter chapter={chapter} courseid={courseid} />
        ))}
      </div>
    </div>
  );
};

export default PresentCourseDetails;
