"use client";
import { useState, useEffect } from "react";
import { editTexts } from "@/HebrewStrings/Texts";
import useCoursesStore from "../../_contexts/courseContext";
import axios from "axios";
import { ChapterData, CourseData, SubjectData } from "../courseCreation/types";

const CourseManager = () => {
  const { setCourses, courses, deleteCourse } = useCoursesStore();
  const [selectedCourse, setSelectedCourse] = useState<CourseData | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<ChapterData | null>(
    null
  );
  const [selectedSubject, setSelectedSubject] = useState<SubjectData | null>(
    null
  );

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
    if (!course || !course.id) return;
    console.log(
      "🚀 ~ file: page.tsx:40 ~ handleUpdateCourse ~ course.id:",
      course.id
    );
    const formData = new FormData();
    formData.append("courseId", course.id);
    await axios.post("/api/deleteCourse", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    deleteCourse(course);
  };

  const handleUpdateCourse = (course: CourseData) => {
    // Implement the update logic, such as navigating to a course update form or calling an API to update the course
  };

  // Similar delete and update handlers can be created for chapters, subjects, and contents

  return (
    <div>
      <h1>{editTexts.courses}</h1>
      {courses.map((course) => (
        <div key={course.id}>
          <span>{course.name}</span>
          <button onClick={() => handleUpdateCourse(course)}>
            {editTexts.rename}
          </button>
          <button onClick={() => handleDeleteCourse(course)}>
            {editTexts.deleteCourse}
          </button>
          <button onClick={() => setSelectedCourse(course)}>
            {editTexts.showChapters}
          </button>

          {selectedCourse === course && (
            <div>
              <h2>{editTexts.chapters}</h2>
              {course.chapters.map((chapter) => (
                <div key={chapter.name}>
                  <span>{chapter.name}</span>
                  {/* Add update and delete buttons and handlers for chapter similar to course */}
                  <button onClick={() => setSelectedChapter(chapter)}>
                    {editTexts.showSubjects}
                  </button>

                  {selectedChapter === chapter && (
                    <div>
                      <h3>{editTexts.subjects}</h3>
                      {chapter.subjects &&
                        chapter.subjects?.map((subject) => (
                          <div key={subject.name}>
                            <span>{subject.name}</span>
                            <button onClick={() => setSelectedSubject(subject)}>
                              {editTexts.contents}
                            </button>

                            {selectedSubject === subject && (
                              <div>
                                <h4>{editTexts.contents}</h4>
                                {subject.contents.map((content) => (
                                  <div key={content.name}>
                                    <span>{content.name}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseManager;
