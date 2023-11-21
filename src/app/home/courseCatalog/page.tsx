"use client"
// import { CourseDataCard } from "@/app/types";
import React, { useState, useEffect } from 'react';
import CourseCard from './_components/courseCard';
import useCoursesStore from '@/app/_contexts/courseContext';
import SearchCourse from './_components/searchCourse';

const CourseCatalog: React.FC = () => {
  const { courses } = useCoursesStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(courses);

  useEffect(() => {
    console.log(searchTerm)
    const filtered = courses.filter(course => 
      course.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, [searchTerm, courses]);

  return (
    <div className="container flex flex-col items-center mx-auto p-4">
      <div>
        <SearchCourse searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCourses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseCatalog;