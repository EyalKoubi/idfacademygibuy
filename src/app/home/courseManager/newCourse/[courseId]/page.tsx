"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddCourseTexts, adminTexts } from "@/HebrewStrings/Texts";
import { usePathname } from "next/navigation";
import useCoursesStore from "@/app/_contexts/courseContext";
import Link from "next/link";

interface ChapterData {
  name: string;
  brief: string;
  subjects: { name: string; contents: any[] }[];
}
interface AddChaptersPageProps {
  params: {
    courseId: string;
  };
}

const AddChaptersPage = (props: AddChaptersPageProps) => {
  const courseId =
    usePathname().split("/")[usePathname().split("/").length - 1];
  const [chapterData, setChapterData] = useState<ChapterData>({
    name: "",
    brief: "",
    subjects: [],
  });
  const [courseName, setCourseName] = useState("");
  const [chapters, setChapters] = useState<ChapterData[]>([]);
  const [subjectAdding, setSubjectAdding] = useState(false);
  const [subjects, setSubjects] = useState<{ name: string; contents: any[] }[]>(
    []
  );
  const [subjectName, setSubjectName] = useState("");
  const { addChapter, courses } = useCoursesStore();
  const handleAddChapter = () => {
    setChapters([...chapters, chapterData]);
    setChapterData({ name: "", brief: "", subjects: [] });
  };

  const handleAddSubject = () => {
    chapterData.subjects.push({ name: subjectName, contents: [] });
    setSubjectName("");
    setSubjectAdding(false);
  };

  useEffect(() => {
    for (let course of courses) {
      if (course.id === courseId) {
        setCourseName(course.name);
        break;
      }
    }
  }, []);

  useEffect(() => {
    console.log("🚀 ~ file: page.tsx:57 ~ AddChaptersPage ~ courses:", courses);
  }, [courses]);

  const handleSubmitChapters = async () => {
    try {
      const formData = new FormData();
      const courseData = { courseId: courseId, chapters: chapters };
      formData.append("courseData", JSON.stringify(courseData));
      await axios.post("/api/addChapters", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      for (let chapter of courseData.chapters) {
        addChapter(courseId, {
          name: chapter.name,
          brief: chapter.brief,
          subjects: chapter.subjects,
        });
      }
      setChapters([]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>{courseName}</h1>
      <Link href="http://localhost:3000/home/courseCreation">
        {AddCourseTexts.chapter.back}
      </Link>
      <h2>{AddCourseTexts.addChapter}</h2>
      <div>
        {subjectAdding ? (
          <div>
            <button onClick={() => setSubjectAdding(false)}>X</button>
            <input
              type="text"
              placeholder={AddCourseTexts.chapter.subject.subjectName}
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
            />
            <button onClick={handleAddSubject}>
              {AddCourseTexts.chapter.subject.addSubject}
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
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
            <button onClick={() => setSubjectAdding(true)}>
              {AddCourseTexts.chapter.addSubject}
            </button>
            <button onClick={handleAddChapter}>
              {AddCourseTexts.addChapter}
            </button>
          </div>
        )}
      </div>

      <ul>
        {chapters.map((chapter, index) => (
          <li key={index}>
            {chapter.name} - {chapter.brief}
            {chapter.subjects &&
              chapter.subjects.map((subject, i) => (
                <p key={i}>{subject.name}</p>
              ))}
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
