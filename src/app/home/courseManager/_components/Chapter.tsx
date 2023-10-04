"use client";
import { GeneralTexts, editTexts } from "@/HebrewStrings/Texts";
import { ChapterData, SubjectData } from "../../courseCreation/types";
import { useState } from "react";
import axios from "axios";
import useCoursesStore from "@/app/_contexts/courseContext";
import Subject from "./Subject";

interface ChapterProps {
  chapter: ChapterData;
  courseId: string;
}

const Chapter = ({ chapter, courseId }: ChapterProps) => {
  const { updateChapter, deletChapter } = useCoursesStore();
  const [isUpdateChapter, setIsUpdateChapter] = useState(false);
  const [chapterName, setChapterName] = useState(chapter.name);
  const [chapterBrief, setChapterBrief] = useState(chapter.brief);
  const [isSelectedChapter, setIsSelectedChapter] = useState(false);

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
          </div>
        </div>
      )}
    </div>
  );
};

export default Chapter;
