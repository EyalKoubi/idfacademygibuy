"use client";
import { useState, useEffect } from "react";
import { GeneralTexts, editTexts } from "@/HebrewStrings/Texts";
import useCoursesStore from "../../_contexts/courseContext";
import axios from "axios";
import { CourseData } from "../courseCreation/types";
import Chapter from "./_components/Chapter";

const CourseManager = () => {
  const { setCourses, courses, deleteCourse, renameCourse } = useCoursesStore();
  const [curRenameCourse, setCurRenameCourse] = useState<CourseData | null>(
    null
  );
  const [courseName, setCourseName] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("api/getCourses");
        setCourses(response.data);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("🚀 ~ file: page.tsx:34 ~ CourseManager ~ courses:", courses);
  }, [courses]);

  const handleDeleteCourse = async (course: CourseData) => {
    const formData = new FormData();
    formData.append("courseId", course.id);
    await axios.post("/api/deleteCourse", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    deleteCourse(course);
  };

  const handleRenameCourse = async (course: CourseData) => {
    const formData = new FormData();
    formData.append(
      "courseRename",
      JSON.stringify({ id: course.id, name: courseName })
    );
    await axios.post("/api/renameCourse", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const renamedCourse = {
      id: course.id,
      name: courseName,
      chapters: course.chapters,
    };
    renameCourse(renamedCourse);
    setCurRenameCourse(null);
  };

  return (
    <div>
      <h1>{editTexts.courses}</h1>
      {courses.map((course) => (
        <div key={course.id}>
          <span>{course.name}</span>
          {curRenameCourse === course ? (
            <>
              <input
                type="text"
                placeholder={editTexts.courseName}
                value={courseName}
                onChange={(e) => {
                  setCourseName(e.target.value);
                }}
              />
              <button onClick={() => handleRenameCourse(course)}>
                {GeneralTexts.submit}
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setCurRenameCourse(course);
                setCourseName(course.name);
              }}
            >
              {editTexts.rename}
            </button>
          )}
          <button onClick={() => handleDeleteCourse(course)}>
            {editTexts.deleteCourse}
          </button>
          <button onClick={() => setSelectedCourse(course)}>
            {editTexts.showChapters}
          </button>

          {selectedCourse === course && (
            <div>
              <h2>{editTexts.chapters}</h2>
              {course.chapters.map((chapter) => {
                return <Chapter key={chapter.id} chapter={chapter} />;
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseManager;
