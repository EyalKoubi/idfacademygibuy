"use client"
// import { CourseDataCard } from "@/app/types";
import CourseCard from "./_components/courseCard";
import useCoursesStore from "@/app/_contexts/courseContext";


const CourseCatalog: React.FC = () => {
  const {courses}=useCoursesStore()
  console.log("the catalog courses",courses)
  return (
    <div className="container mx-auto p-4">
      <input type="search" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseCatalog;
