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
  const { deleteCourse, renameCourse, addChapter } = useCoursesStore();
  const [isRenameCourse, setIsRenameCourse] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [isSelectedCourse, setIsSelectedCourse] = useState(false);
  const [isAddChapterPressed, setIsAddChapterPressed] = useState(false);
  const [newChapterName, setNewChapterName] = useState("");
  const [newChapterBrief, setNewChapterBrief] = useState("");
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

  const handleAddChapter = async () => {
    const formData = new FormData();
    const addChapterProps = {
      courseId: course.id,
      chapterName: newChapterName,
      chapterBrief: newChapterBrief,
    };
    formData.append("courseAddChapter", JSON.stringify(addChapterProps));
    const response = await axios.post("/api/addChapter", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    addChapter(course.id, {
      id: response.data.id,
      name: response.data.name,
      brief: response.data.brief,
      subjects: [],
    });
    setIsAddChapterPressed(false);
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
            {course.chapters.map((chapter, index) => {
              return (
                <Chapter
                  key={chapter.id}
                  chapter={chapter}
                  courseId={course.id}
                  chapterIndex={index}
                />
              );
            })}
            {isAddChapterPressed ? (
              <div className="bg-white p-6 rounded shadow max-w-md mx-auto mt-10 flex flex-col space-y-4">
                <input
                  type="text"
                  placeholder={editTexts.chapterName}
                  value={newChapterName}
                  onChange={(e) => setNewChapterName(e.target.value)}
                  className="p-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder={editTexts.chapterBrief}
                  value={newChapterBrief}
                  onChange={(e) => setNewChapterBrief(e.target.value)}
                  className="p-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleAddChapter}
                  className="bg-green-500 text-white p-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
                >
                  {GeneralTexts.submit}
                </button>
                <button
                  onClick={() => setIsAddChapterPressed(false)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                >
                  {GeneralTexts.back}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAddChapterPressed(true)}
                className="bg-purple-500 text-white w-12 h-12 rounded-full hover:bg-purple-700 active:scale-90 transition transform"
                aria-label="Add"
              >
                <svg
                  className="w-6 h-6 mx-auto my-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;
