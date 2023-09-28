"use client";
import { useState } from "react";
import { AddCourseTexts, adminTexts } from "@/HebrewStrings/Texts";
import Chapter from "./_components/Chapter";

interface CourseDataProps {
  name: string;
  chapterSummary: string;
}

const CoursePage = () => {
  const [chapters, setChapters] = useState<any[]>([]);
  const [courseData, setCourseData] = useState<CourseDataProps>({
    name: "",
    chapterSummary: "",
  });
  const [courseApproved, setCourseApproved] = useState<boolean>(false);

  const handleChapterAdd = () => {
    setChapters([...chapters, { ...courseData, subjects: [] }]);
    setCourseData({ name: "", chapterSummary: "" });
  };

  return (
    <div>
      <h1>{adminTexts.adminAddCourse}</h1>
      <input
        type="text"
        placeholder={AddCourseTexts.courseName}
        value={courseData.name}
        onChange={(e) => setCourseData({ ...courseData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder={AddCourseTexts.courseSummery}
        value={courseData.chapterSummary}
        onChange={(e) =>
          setCourseData({ ...courseData, chapterSummary: e.target.value })
        }
      />
      <button onClick={handleChapterAdd}>{AddCourseTexts.addChapter}</button>
      {chapters.map((chapter, index) => (
        <Chapter key={index} chapterData={chapter} />
      ))}
    </div>
  );
};

export default CoursePage;
