"use client";
import { AddCourseTexts, GeneralTexts, editTexts } from "@/HebrewStrings/Texts";
import { ChapterData, ContentData, SubjectData } from "@/app/types/types";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import NewContent from "./NewContent";

interface NewSubjectProps {
  courseName: string;
  chapterData: ChapterData;
  setSubjectAdding: Dispatch<SetStateAction<boolean>>;
  setChapterData: Dispatch<SetStateAction<ChapterData>>;
}

const NewSubject = ({
  chapterData,
  courseName,
  setSubjectAdding,
  setChapterData,
}: NewSubjectProps) => {
  const [subjectName, setSubjectName] = useState("");
  const [contentAdding, setContentAdding] = useState(false);
  const [subjectData, setSubjectData] = useState<SubjectData>({
    id: "",
    name: "",
    contents: [],
  });

  const handleAddSubject = () => {
    const newSubjects = chapterData.subjects;
    newSubjects.push({
      id: "",
      name: subjectName,
      contents: subjectData.contents,
    });
    setChapterData({
      id: chapterData.id,
      name: chapterData.name,
      brief: chapterData.brief,
      subjects: newSubjects,
    });
    console.log(
      "🚀 ~ file: NewSubject.tsx:43 ~ handleAddSubject ~ chapterData:",
      chapterData
    );
    setSubjectAdding(false);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-lg max-w-lg mx-auto mt-10">
      {contentAdding ? (
        <NewContent
          setSubjectData={setSubjectData}
          courseName={courseName}
          chapterData={chapterData}
          subjectData={subjectData}
          subjectName={subjectName}
          setContentAdding={setContentAdding}
        />
      ) : (
        <div>
          <h2 className="text-2xl text-gray-800 mb-4">
            {editTexts.courseName} :{" "}
            <span className="font-semibold">{courseName}</span>
          </h2>
          <h2 className="text-2xl text-gray-800 mb-4">
            {editTexts.chapterName} :{" "}
            <span className="font-semibold">{chapterData.name}</span>
          </h2>
          <input
            type="text"
            placeholder={AddCourseTexts.chapter.subject.subjectName}
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            className="p-2 w-full border rounded-md shadow-sm mb-4"
          />
          <div className="flex justify-between">
            <div>
              <button
                onClick={handleAddSubject}
                className="p-2 bg-green-600 text-white rounded-md hover:bg-green-800 shadow-sm mb-4"
              >
                {GeneralTexts.submit}
              </button>
              <button
                onClick={() => setContentAdding(true)}
                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 shadow-sm"
              >
                {editTexts.addContent}
              </button>
            </div>
            <button
              onClick={() => setSubjectAdding(false)}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-700 shadow-sm mb-4"
            >
              {GeneralTexts.back}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewSubject;
