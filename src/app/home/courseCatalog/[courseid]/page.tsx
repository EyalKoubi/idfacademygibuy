"use client"
import React, { useState, useEffect } from 'react';
import PresentCourseDetail from '../_components/PresentCourseDetail';
import { CourseData } from '@/app/types';
interface  PresentCourseDetailsProps{
    params:{
        courseid:string;
      }
    course:CourseData;
}
  const PresentCourse: React.FC<PresentCourseDetailsProps> = (props) => {
    return (
        <div>
            <PresentCourseDetail courseid={props.params.courseid}/>
        </div>
    );
                }
  
  export default PresentCourse;