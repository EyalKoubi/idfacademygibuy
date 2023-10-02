"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddCourseTexts } from "@/HebrewStrings/Texts";
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
    usePathname().split("/")[usePathname().split("/").length - 2];
  const [chapterData, setChapterData] = useState<ChapterData>({
    name: "",
    brief: "",
    subjects: [],
  });
  const [courseName, setCourseName] = useState("");
  const [chapters, setChapters] = useState<ChapterData[]>([]);
  const [subjectName, setSubjectName] = useState("");
  const [selectedChapterIndex, setSelectedChapterIndex] = useState<
    number | null
  >(null);

  const { addChapter, courses } = useCoursesStore();
  const handleAddChapter = () => {
    setChapters([...chapters, chapterData]);
    setChapterData({ name: "", brief: "", subjects: [] });
  };

  useEffect(() => {
    for (let course of courses) {
      if (course.id === courseId) {
        setCourseName(course.name);
        break;
      }
    }
  }, []);

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

  const handleAddSubject = (index: number) => {
    const updatedChapters = [...chapters];
    updatedChapters[index].subjects.push({ name: subjectName, contents: [] });
    setChapters(updatedChapters);
    setSubjectName("");
    setSelectedChapterIndex(null);
  };

  return (
    <div>
      <h1>{courseName}</h1>
      <Link href="http://localhost:3000/home/courseCreation">
        {AddCourseTexts.chapter.back}
      </Link>
      <h2>{AddCourseTexts.addChapter}</h2>
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
        <button onClick={handleAddChapter}>{AddCourseTexts.addChapter}</button>

        {/* Here, we have added the add subject button and input field in the same row */}
        <button onClick={() => setSelectedChapterIndex(chapters.length)}>
          {AddCourseTexts.chapter.addSubject}
        </button>

        {selectedChapterIndex === chapters.length && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              placeholder="Subject Name"
            />
            <button onClick={() => handleAddSubject(chapters.length - 1)}>
              Submit
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
      {/* Modifications end here */}

      {chapters.length > 0 && (
        <button onClick={handleSubmitChapters}>
          {AddCourseTexts.chapter.approveChapter}
        </button>
      )}
    </div>
  );
};

export default AddChaptersPage;
