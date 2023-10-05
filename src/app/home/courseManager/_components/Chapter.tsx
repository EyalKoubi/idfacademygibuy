"use client";
import { GeneralTexts, editTexts } from "@/HebrewStrings/Texts";
import { ChapterData, SubjectData } from "../../courseCreation/types";
import { useState } from "react";
import axios from "axios";
import useCoursesStore from "@/app/_contexts/courseContext";
import Subject from "./Subject";

interface ChapterProps {
  chapter: ChapterData;
  chapterIndex: number;
  courseId: string;
}

const Chapter = ({ chapter, chapterIndex, courseId }: ChapterProps) => {
  const { updateChapter, deletChapter, addSubject } = useCoursesStore();
  const [isUpdateChapter, setIsUpdateChapter] = useState(false);
  const [chapterName, setChapterName] = useState(chapter.name);
  const [chapterBrief, setChapterBrief] = useState(chapter.brief);
  const [isSelectedChapter, setIsSelectedChapter] = useState(false);
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState("");

  const handleUpdateChapter = async () => {
    const formData = new FormData();
    const updatedChapter = {
      id: chapter.id,
      name: chapterName,
      brief: chapterBrief,
      subjects: chapter.subjects,
    };
    formData.append("updateChapterProps", JSON.stringify(updatedChapter));
    await axios.post("/api/updateChapter", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    updateChapter(updatedChapter, courseId);
    setIsUpdateChapter(false);
  };

  const handleDeleteChapter = async () => {
    const formData = new FormData();
    formData.append("chapterId", chapter.id);
    await axios.post("/api/deleteChapter", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    deletChapter(chapter, courseId);
  };

  const handleAddSubject = async () => {
    const formData = new FormData();
    const addSubjectProps = { name: newSubjectName, chapterId: chapter.id };
    formData.append("addSubjectProps", JSON.stringify(addSubjectProps));
    const response = await axios.post("/api/addSubject", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const newSubFromBd: SubjectData = {
      id: response.data.id,
      name: response.data.name,
      contents: [],
    };
    addSubject(courseId, chapterIndex, newSubFromBd);
    setIsAddingSubject(false);
  };

  return (
    <div className="p-4 bg-gray-200 rounded shadow mb-4">
      <span className="text-lg font-bold">{chapter.name}</span>
      {isUpdateChapter ? (
        <>
          <input
            type="text"
            placeholder={editTexts.chapterName}
            value={chapterName}
            onChange={(e) => {
              setChapterName(e.target.value);
            }}
            className="p-2 ml-4 border rounded"
          />
          <input
            type="text"
            placeholder={editTexts.chapterBrief}
            value={chapterBrief}
            onChange={(e) => {
              setChapterBrief(e.target.value);
            }}
            className="p-2 ml-2 border rounded"
          />
          <button
            onClick={handleUpdateChapter}
            className="p-2 ml-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            {GeneralTexts.submit}
          </button>
        </>
      ) : (
        <div className="flex flex-row">
          <button
            onClick={() => {
              setIsUpdateChapter(true);
            }}
            className="p-2 ml-4 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            {editTexts.updateChapter}
          </button>
          <button
            onClick={handleDeleteChapter}
            className="p-2 ml-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            {editTexts.deleteChapter}
          </button>
          <button
            onClick={() => setIsSelectedChapter(true)}
            className="p-2 ml-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            {editTexts.showSubjects}
          </button>
        </div>
      )}

      {isSelectedChapter && (
        <div className="mt-4 p-4 bg-white rounded shadow">
          <h3 className="text-xl mb-4">{editTexts.subjects}</h3>
          <div className="space-y-2">
            {chapter.subjects &&
              chapter.subjects?.map((subject) => (
                <Subject
                  key={subject.id}
                  subject={subject}
                  chapterId={chapter.id}
                  courseId={courseId}
                />
              ))}
            {isAddingSubject ? (
              <div className="bg-white p-6 rounded shadow max-w-md mx-auto mt-10 flex flex-col space-y-4">
                <input
                  type="text"
                  placeholder={editTexts.subjectName}
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  className="p-2 border rounded shadow-sm focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={handleAddSubject}
                  className="bg-green-500 text-white p-2 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
                >
                  {GeneralTexts.submit}
                </button>
                <button
                  onClick={() => setIsAddingSubject(false)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
                >
                  {GeneralTexts.back}
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsAddingSubject(true)}
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

export default Chapter;
