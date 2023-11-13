"use client";
import { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { AddCourseTexts, adminTexts, editTexts } from "@/HebrewStrings/Texts";
import { usePathname } from "next/navigation";
import useCoursesStore from "@/app/_contexts/courseContext";
import Link from "next/link";
import { ChapterData } from "@/app/types";
import NewSubject from "../../_components/NewSubject";

interface AddChaptersPageProps {
  params: {
    courseId: string;
  };
}

const AddChaptersPage = (props: AddChaptersPageProps) => {
  const courseId =props.params.courseId
  const [chapterData, setChapterData] = useState<ChapterData>({
    id: "",
    name: "",
    brief: "",
    subjects: [],
  });
  const [courseName, setCourseName] = useState("");
  const [chapters, setChapters] = useState<ChapterData[]>([]);
  const [subjectAdding, setSubjectAdding] = useState(false);
  const { addChapter, courses } = useCoursesStore();

  const handleAddChapter = () => {
    setChapters([...chapters, chapterData]);
    setChapterData({ id: "", name: "", brief: "", subjects: [] });
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
          id: chapter.id,
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
    <div className="bg-gray-50 min-h-screen p-5">
      <div className="max-w-2xl mx-auto">
        {subjectAdding ? (
          <NewSubject
            courseName={courseName}
            chapterData={chapterData}
            setSubjectAdding={setSubjectAdding}
            setChapterData={setChapterData}
          />
        ) : (
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <h1 className="text-4xl mb-5 text-gray-800">{courseName}</h1>
            <Link
              href="http://localhost:3000/home/courseCreation"
              className="text-blue-600 hover:underline mb-4 inline-block"
            >
              {AddCourseTexts.chapter.back}
            </Link>
            <h2 className="text-3xl my-4 text-gray-700">
              {AddCourseTexts.addChapter}
            </h2>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder={AddCourseTexts.chapter.chapterName}
                value={chapterData.name}
                onChange={(e) =>
                  setChapterData({ ...chapterData, name: e.target.value })
                }
                className="p-2 border rounded-md shadow-sm"
              />
              <input
                type="text"
                placeholder={AddCourseTexts.chapter.chapterSummery}
                value={chapterData.brief}
                onChange={(e) =>
                  setChapterData({ ...chapterData, brief: e.target.value })
                }
                className="p-2 border rounded-md shadow-sm"
              />
              <button
                onClick={() => setSubjectAdding(true)}
                className="p-2 bg-green-600 text-white rounded-md hover:bg-green-800 shadow-sm"
              >
                {AddCourseTexts.chapter.addSubject}
              </button>
              <button
                onClick={handleAddChapter}
                className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 shadow-sm"
              >
                {AddCourseTexts.addChapter}
              </button>
            </div>
            <ul className="list-decimal pl-8 mt-4 text-gray-700">
              {chapters.map((chapter, index) => (
                <li key={index} className="my-2">
                  {chapter.name} - {chapter.brief}
                  {chapter.subjects &&
                    chapter.subjects.map((subject, i) => (
                      <p key={i} className="ml-8 text-gray-600">
                        {subject.name}
                      </p>
                    ))}
                </li>
              ))}
            </ul>

            {chapters.length > 0 && (
              <button
                onClick={handleSubmitChapters}
                className="mt-5 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-800 shadow-sm"
              >
                {AddCourseTexts.chapter.approveChapter}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddChaptersPage;
