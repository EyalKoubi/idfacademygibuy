"use client"
// import { CourseDataCard } from "@/app/types";
import React, { useState, useEffect } from 'react';
import CourseCard from './_components/courseCard';
import useCoursesStore from '@/app/_contexts/courseContext';
import SearchCourse from './_components/searchCourse';
import { CourseData } from '@/app/types';

const CourseCatalog: React.FC = () => {
  const { courses } = useCoursesStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(courses);

  const [filterType, setFilterType] = useState('name'); // 'name' or 'date'
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  let filtered:CourseData[];
  useEffect(() => {
   // let filtered:CourseData[];
   let filtered:CourseData[]=[];
    if (filterType === 'name') {
      filtered = courses.filter(course =>
        course.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
    } else if (filterType === 'date' && dateRange.start && dateRange.end) {
      // Add your date filtering logic here
      const startDate = new Date(dateRange.start);
      const endDate = new Date(dateRange.end);
      filtered = courses.filter(course => {
        if(course.creationTimestamp){
          const courseDate = new Date(course.creationTimestamp); 
          return courseDate >= startDate && courseDate <= endDate;
        }
      });
    }
    setFilteredCourses(filtered);
  }, [searchTerm, courses, filterType, dateRange]);

  return (
    <div className="container flex flex-col items-center mx-auto p-4">
      <div>
      <SearchCourse 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        setFilterType={setFilterType}
        setDateRange={setDateRange}
      />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

      {filteredCourses.length > 0 ? (
        filteredCourses.map((course, index) => (
            <CourseCard key={index} course={course} />
        ))
    ) : (
        <p className="col-span-full text-center">No courses found for this search.</p>
    )}
      </div>
    </div>
  );
};

export default CourseCatalog;