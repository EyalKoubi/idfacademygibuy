import { CourseDataCard } from "@/app/types/types";
import CourseCard from "./_components/courseCard";

const courses: CourseDataCard[] = [
  {
    name: "Introduction to Programming",
    image: "https://example.com/images/course1.jpg",
    chapters: [
      {
        name: "Variables and Data Types",
        brief:
          "An introduction to various data types and variables in programming.",
        subjects: [
          {
            name: "Data Types",
            contents: [
              {
                name: "Integers",
                file_name: "integers.pdf",
                comments: "Detailed document about integers data type.",
              },
              {
                name: "Strings",
                file_name: "strings.pdf",
                comments: "Detailed document about strings data type.",
              },
              // Add more content data as needed
            ],
          },
          // Add more subjects as needed
        ],
      },
      // Add more chapters as needed
    ],
  },
  {
    name: "Web Development Fundamentals",
    image: "https://example.com/images/course2.jpg",
    chapters: [
      {
        name: "HTML Basics",
        brief: "A comprehensive guide to mastering HTML for web development.",
        subjects: [
          {
            name: "HTML Elements",
            contents: [
              {
                name: "Headings",
                file_name: "headings.pdf",
                comments: "Document about using HTML headings.",
              },
              {
                name: "Paragraphs",
                file_name: "paragraphs.pdf",
                comments: "Guide on implementing paragraphs in HTML.",
              },
              // Add more content data as needed
            ],
          },
          // Add more subjects as needed
        ],
      },
      // Add more chapters as needed
    ],
  },
  // Add more courses as גneeded
];

const CourseCatalog: React.FC = () => {
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
