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
  const [selectedSubject, setSelectedSubject] = useState<SubjectData | null>(
    null
  );

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
    <div>
      <span>{chapter.name}</span>
      {isUpdateChapter ? (
        <>
          <input
            type="text"
            placeholder={editTexts.chapterName}
            value={chapterName}
            onChange={(e) => {
              setChapterName(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder={editTexts.chapterBrief}
            value={chapterBrief}
            onChange={(e) => {
              setChapterBrief(e.target.value);
            }}
          />
          <button onClick={handleUpdateChapter}>{GeneralTexts.submit}</button>
        </>
      ) : (
        <button
          onClick={() => {
            setIsUpdateChapter(true);
          }}
        >
          {editTexts.updateChapter}
        </button>
      )}
      <button onClick={handleDeleteChapter}>{editTexts.deleteChapter}</button>
      <button onClick={() => setIsSelectedChapter(true)}>
        {editTexts.showSubjects}
      </button>

      {isSelectedChapter && (
        <div>
          <h3>{editTexts.subjects}</h3>
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
      )}
    </div>
  );
};

export default Chapter;
