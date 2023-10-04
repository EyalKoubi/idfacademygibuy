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
    <div key={course.id} className="p-4 bg-white rounded shadow-lg">
      <div className="flex-col">
        <span className="text-lg font-bold">{course.name}</span>
        <div className="flex flex-row">
          <button
            onClick={() => {
              setIsRenameCourse(true);
              setCourseName(course.name);
            }}
            className="p-2 ml-4 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            {editTexts.rename}
          </button>
          <button
            onClick={() => handleDeleteCourse(course)}
            className="p-2 ml-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            {editTexts.deleteCourse}
          </button>
          <button
            onClick={() => setIsSelectedCourse(true)}
            className="p-2 ml-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            {editTexts.showChapters}
          </button>
        </div>
      </div>
      {isRenameCourse ? (
        <>
          <input
            type="text"
            placeholder={editTexts.courseName}
            value={courseName}
            onChange={(e) => {
              setCourseName(e.target.value);
            }}
            className="p-2 ml-4 border rounded"
          />
          <button
            onClick={() => handleRenameCourse(course)}
            className="p-2 ml-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            {GeneralTexts.submit}
          </button>
        </>
      ) : (
        <></>
      )}

      {isSelectedCourse && (
        <div className="mt-4">
          <h2 className="text-2xl mb-4">{editTexts.chapters}</h2>
          <div className="flex-row gap-4">
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
        </div>
      )}
    </div>
  );
};

export default Course;
