"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useCoursesStore from "@/app/_contexts/courseContext";
import { CourseData } from "@/app/types";

const SearchCourseHomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {courses}=useCoursesStore();
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<CourseData[]>([]); // State to store search suggestions
  const searchCourses = (searchQuery:string) => {
    // You can implement your search logic here, either by filtering the courses locally
    // or by making an API request to a backend to fetch matching courses.
  
    // For now, let's assume you have an array of courses and you want to filter them
    // based on the course name containing the searchQuery.
  
    const filteredCourses = courses.filter((course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    return filteredCourses;
  };

  const handleSearch = (suggestionCourse:CourseData) => {
    console.log("bllblvlb")
    const matchingCourses = searchCourses(searchQuery);
    router.push(`home/courseCatalog/${suggestionCourse.id}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("aaaaa")
    const query = e.target.value;
    console.log(query)
    setSearchQuery(query);

    // Generate suggestions based on the query
    if (query.trim() !== "") {
      const matchingCourses:CourseData[] = courses.filter((course) =>
        course.name.toLowerCase().includes(query.toLowerCase())
      );
      console.log(matchingCourses)
      setSuggestions(matchingCourses);
    } else {
      setSuggestions([]); // Clear suggestions if query is empty
    }
  };

  return (
    <div className="bg-white flex w-5/5 items-center justify-center p-4 rounded-md gap-5 relative"> {/* Add 'relative' class to the container */}
  
      <div className="flex flex-col w-6/12 text-sm rounded-md">
        <input
          className="rounded-md border p-3 focus:border-black focus:ring-0 focus:ring-black hover:border-black"
          type="text"
          placeholder="מה הקורס הבא שלך?"
          dir="rtl"
          onChange={handleInputChange}
        />
      </div>
      <button className="btn flex-grow flex-shrink w-3/12 bg-emerald-700 hover:bg-emerald-800 text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="3"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
        קטגוריות
      </button>
      
      {suggestions.length > 0 && (
        <div className="absolute z-10 mt-2 left-0 bg-white border border-gray-300 w-60 rounded-lg shadow-lg"> {/* Use 'left-0' to position it at the left */}
          <ul>
            {suggestions.map((suggestionCourse) => (
              <li key={suggestionCourse.id}>
                <button
                  onClick={() => {
                    setSearchQuery(suggestionCourse.name); // Set the selected suggestion as the query
                    setSuggestions([]); // Clear suggestions
                    handleSearch(suggestionCourse)
                  }}
                >
                  {suggestionCourse.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchCourseHomePage;