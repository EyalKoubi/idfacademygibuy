"use client";
import { GeneralTexts, editTexts } from "@/HebrewStrings/Texts";
import { ChapterData, SubjectData } from "../../../types";
import { useState } from "react";
import axios from "axios";
import useCoursesStore from "@/app/_contexts/courseContext";
import Subject from "./Subject";
import AddSubject from "./AddSubject";

interface ChapterProps {
  key:string,
  chapter: ChapterData,
  courseId: string,
  chapterIndex: number;
}

const Chapter= ({key, chapter, chapterIndex, courseId }: ChapterProps) => {
  const { updateChapter, deletChapter, addSubject, courses } =
    useCoursesStore();
  const [isUpdateChapter, setIsUpdateChapter] = useState(false);
  const [chapterName, setChapterName] = useState(chapter.name);
  const [chapterBrief, setChapterBrief] = useState(chapter.brief);
  const [isSelectedChapter, setIsSelectedChapter] = useState(false);
  const [isAddingSubject, setIsAddingSubject] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [addSubjectError,setAddSubjectError]=useState('');
  const [renameChapterError,setRenameChapterError]=useState('');
  const handleUpdateChapter = async () => {
    const formData = new FormData();
    const updatedChapter = {
      id: chapter.id,
      name: chapterName,
      brief: chapterBrief,
      subjects: chapter.subjects,
    };
    formData.append("updateChapterProps", JSON.stringify(updatedChapter));
    const response =await axios.post("/api/updateChapter", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if(response.data?.message){
      setRenameChapterError(response.data?.message)
    }
    else{
      updateChapter(updatedChapter, courseId);
      setIsUpdateChapter(false);
    }
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
          {renameChapterError&& (
                  <div className="text-red-500">
                 {renameChapterError}
                  </div>
                )}
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
              chapter.subjects?.map((subject, index) => (
                <Subject
                  key={subject.id}
                  chapterId={chapter.id}
                  courseId={courseId}
                  subject={subject}
                />
              ))}
            {isAddingSubject ? (
              <div>
            <AddSubject chapter={chapter} courseId={courseId} chapterIndex={chapterIndex} setIsAddingSubject={setIsAddingSubject} setAddSubjectError={setAddSubjectError}/>
                {addSubjectError && (
                  <div className="text-red-500">
                    {addSubjectError}
                  </div>
                )}
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
