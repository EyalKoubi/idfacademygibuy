import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useCoursesStore from "@/app/_contexts/courseContext";
import { CourseData } from "@/app/types";

const SearchCourseHomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { courses } = useCoursesStore();
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<CourseData[]>([]);

  const searchCourses = (searchQuery: string) => {
    const filteredCourses = courses.filter((course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return filteredCourses;
  };

  const handleSearch = (suggestionCourse: CourseData) => {
    const matchingCourses = searchCourses(searchQuery);
    router.push(`home/courseCatalog/${suggestionCourse.id}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() !== "") {
      const matchingCourses: CourseData[] = courses.filter((course) =>
        course.name.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(matchingCourses);
    } else {
      setSuggestions([]);
    }
  };
  const SearchIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-search"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M10.742 9.742a5.5 5.5 0 1 0-1.414 1.414h-.001a5.5 5.5 0 0 0 1.414-1.414zM11 6.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0z"
      />
    </svg>
  );
  return (
    <div className="flex flex-col">
      <div className="bg-white flex flex-col w-5/5 items-center justify-center p-4 rounded-md gap-5 relative">
        <div className="flex flex-col w-full text-sm rounded-md">
          <div className="relative">
            <input
              className="rounded-md border p-3 pl-10 focus:border-black focus:ring-0 focus:ring-black hover:border-black"
              type="text"
              placeholder="מה הקורס הבא שלך?"
              dir="rtl"
              onChange={handleInputChange}
            />
            <div className="absolute top-3 left-3 text-gray-400">{SearchIcon}</div>
          </div>
        </div>
      </div>
      {suggestions.length > 0 && (
        <div className="bg-white border text-right border-gray-300 w-60 rounded-lg shadow-lg mt-1 left-0"> {/* Adjust positioning here */}
          <ul>
            {suggestions.map((suggestionCourse) => (
              <li key={suggestionCourse.id}>
                <button
                  onClick={() => {
                    setSearchQuery(suggestionCourse.name);
                    setSuggestions([]);
                    handleSearch(suggestionCourse);
                  }}
                >
                        <div className="flex items-center">
                    
                      <span className="ml-2">{suggestionCourse.name}</span>
                      {SearchIcon}
                    </div>
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