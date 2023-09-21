// components/Chapter.js
import React, { useState } from "react";
import Subject from "./Subject";
import { AddCourseTexts } from "@/HebrewStrings/Texts";

interface ChapterProps {
  chapterData: {
    name: string;
    chapterSummary: string;
  };
}

const Chapter = ({ chapterData }: ChapterProps) => {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [subjectData, setSubjectData] = useState({
    name: "",
  });

  const handleSubjectAdd = () => {
    setSubjects([...subjects, subjectData]);
    setSubjectData({ name: "" });
  };

  return (
    <div>
      <h2>{chapterData.name}</h2>
      <p>{chapterData.chapterSummary}</p>
      <input
        type="text"
        placeholder={AddCourseTexts.chapter.chapterName}
        value={subjectData.name}
        onChange={(e) =>
          setSubjectData({ ...subjectData, name: e.target.value })
        }
      />
      <button onClick={handleSubjectAdd}>
        {AddCourseTexts.chapter.addSubject}
      </button>
      {subjects.map((subject, index) => (
        <Subject key={index} subjectData={subject} />
      ))}
    </div>
  );
};

export default Chapter;
