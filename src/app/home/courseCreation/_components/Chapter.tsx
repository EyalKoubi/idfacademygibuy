// components/Chapter.js
import React, { useState } from "react";
import Subject from "./Subject";
import { AddCourseTexts } from "@/HebrewStrings/Texts";
import axios from "axios";
import useSingleCourseStore from "@/app/_contexts/singleCourseContext";
import { ChapterData } from "../types";

interface ChapterProps {
  onApprove?: () => void;
}

const Chapter = ({ onApprove }: ChapterProps) => {
  // const [subjects, setSubjects] = useState<any[]>([]);
  const [chapterName, setChapterName] = useState("");
  const [chapterBrief, setChapterBrief] = useState("");
  const [subjectData, setSubjectData] = useState({
    name: "",
  });
  // const [chapterApproved, setChapterApproved] = useState(false);

  // const handleSubjectAdd = () => {
  //   setSubjects([...subjects, subjectData]);
  //   setSubjectData({ name: "" });
  // };

  // const handleApprove = async () => {
  //   const curChapter = { name: chapterName, brief: chapterBrief, subjects: [] };
  //   addChapter(curChapter);

  //   setChapterApproved(true);
  //   onApprove && onApprove();
  // };

  return (
    <div>
      <input
        type="text"
        placeholder={AddCourseTexts.chapter.chapterName}
        value={chapterName}
        onChange={(e) => setChapterName(e.target.value)}
      />
      <textarea
        placeholder={AddCourseTexts.chapter.chapterSummery}
        value={chapterBrief}
        onChange={(e) => setChapterBrief(e.target.value)}
      />
      {/* <button onClick={handleSubjectAdd}>
        {AddCourseTexts.chapter.addSubject}
      </button> */}
      {/* {subjects.map((subject, index) => (
        <Subject key={index} subjectData={subject} />
      ))} */}
      {/* <button onClick={handleApprove}>
        {AddCourseTexts.chapter.approveChapter}
      </button> */}
    </div>
  );
};

export default Chapter;
