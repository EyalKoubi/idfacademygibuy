"use client";
import useCoursesStore from "@/app/_contexts/courseContext";
import Chapter from "./Chapter";
import { useState } from "react";
import { CourseData } from "../../courseCreation/types";
import { GeneralTexts, editTexts } from "@/HebrewStrings/Texts";
import axios from "axios";

interface CourseProps {
  course: CourseData;
}

const Course = ({ course }: CourseProps) => {
  const { deleteCourse, renameCourse } = useCoursesStore();
  const [isRenameCourse, setIsRenameCourse] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [isSelectedCourse, setIsSelectedCourse] = useState(false);
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
    setIsRenameCourse(false);
  };
  return (
    <div key={course.id}>
      <span>{course.name}</span>
      {isRenameCourse ? (
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
            setIsRenameCourse(true);
            setCourseName(course.name);
          }}
        >
          {editTexts.rename}
        </button>
      )}
      <button onClick={() => handleDeleteCourse(course)}>
        {editTexts.deleteCourse}
      </button>
      <button onClick={() => setIsSelectedCourse(true)}>
        {editTexts.showChapters}
      </button>

      {isSelectedCourse && (
        <div>
          <h2>{editTexts.chapters}</h2>
          {course.chapters.map((chapter) => {
            return (
              <Chapter
                key={chapter.id}
                chapter={chapter}
                courseId={course.id}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Course;
