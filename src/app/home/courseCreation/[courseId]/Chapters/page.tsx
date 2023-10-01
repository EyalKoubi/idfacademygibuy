"use client";
import { useState } from "react";
import axios from "axios";
import { AddCourseTexts } from "@/HebrewStrings/Texts";
import { usePathname } from "next/navigation";

interface ChapterData {
  name: string;
  brief: string;
}

const AddChaptersPage = () => {
  const courseId =
    usePathname().split("/")[usePathname().split("/").length - 2];
  const [chapterData, setChapterData] = useState<ChapterData>({
    name: "",
    brief: "",
  });
  const [chapters, setChapters] = useState<ChapterData[]>([]);

  const handleAddChapter = () => {
    console.log(
      "🚀 ~ file: page.tsx:28 ~ handleSubmitChapters ~ pathname:",
      courseId
    );
    setChapters([...chapters, chapterData]);
    setChapterData({ name: "", brief: "" });
  };

  const handleSubmitChapters = async () => {
    try {
      console.log(
        "🚀 ~ file: page.tsx:28 ~ handleSubmitChapters ~ pathname:",
        courseId
      );
      const formData = new FormData();
      const courseData = { courseId: courseId, chapters: chapters };
      formData.append("courseData", JSON.stringify(courseData));
      console.log(
        "🚀 ~ file: page.tsx:39 ~ handleSubmitChapters ~ JSON.stringify(courseData):",
        JSON.stringify(courseData)
      );
      const response = await axios.post("/api/addChapters", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("Chapters added:", response.data);
      setChapters([]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>{AddCourseTexts.addChapter}</h1>
      <input
        type="text"
        placeholder={AddCourseTexts.chapter.chapterName}
        value={chapterData.name}
        onChange={(e) =>
          setChapterData({ ...chapterData, name: e.target.value })
        }
      />
      <input
        type="text"
        placeholder={AddCourseTexts.chapter.chapterSummery}
        value={chapterData.brief}
        onChange={(e) =>
          setChapterData({ ...chapterData, brief: e.target.value })
        }
      />
      <button onClick={handleAddChapter}>{AddCourseTexts.addChapter}</button>

      <ul>
        {chapters.map((chapter, index) => (
          <li key={index}>
            {chapter.name} - {chapter.brief}
          </li>
        ))}
      </ul>

      {chapters.length > 0 && (
        <button onClick={handleSubmitChapters}>
          {AddCourseTexts.chapter.approveChapter}
        </button>
      )}
    </div>
  );
};

export default AddChaptersPage;
