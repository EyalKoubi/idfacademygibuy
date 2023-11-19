"use client"
import { FormEvent, useState } from "react";
import { AddCourseTexts, adminTexts } from "@/HebrewStrings/Texts";
import { CourseData } from "@/app/types";
import axios, { AxiosError } from "axios";
import useCoursesStore from "@/app/_contexts/courseContext";
import { useRouter } from "next/navigation";
import { ContentData } from "./types";
interface ErrorResponse {
  message?: string;
}
const AddCoursePage: React.FC = () => {
  const { addCourse } = useCoursesStore();
  const [courseData, setCourseData] = useState<CourseData>({
    id: "",
    name: "",
    img_id: "",
    creationTimestamp: new Date(),
    chapters: [],
  });
  const [fileData, setFileData] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const submitFile = async () =>{
    //setLoading(true)
    if (!fileData) return;
    const formData: any = new FormData();
    formData.append("file", fileData, fileData.name);
    formData.append("comments",courseData.name);
    //formData.append("subjectId", subject.id);
    console.log(formData);

    try {
      //console.log(file);
      const response = await axios.post("/api/addContent", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data?.message) {
      //     setAddContentError(response.data?.message)
      console.log(response.data?.message)
       }
      else{
      const newCont:ContentData = response.data;
      //setIsAddingContent(false);
      //addContent(courseId, chapterId, subject.id, newCont);
      console.log(newCont)
      return newCont.id;
      }

    } catch (error) {
      console.log("🚀 ~ file: Subject.tsx:38 ~ submitFile ~ error:", error);
    }
  };

  const handleSubmit = async () => {
    setError(null);
    try {
      const formData = new FormData();
      formData.append("course", JSON.stringify(courseData));
      const img_id=await submitFile();
      if(img_id)
        setCourseData({ ...courseData, img_id: img_id })
      const response = await axios.post("/api/addCourse", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data?.id) {
        addCourse(response.data);
        router.push(`/home/courseManager/${response.data.id}`);
      } else {
        setError(response.data?.message);
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      setError(error?.response?.data?.message || error.message || "An error occurred while adding the course.");
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-xl shadow-lg max-w-md mx-auto mt-10">
      <h1 className="text-3xl text-gray-800 mb-6">{adminTexts.adminAddCourse}</h1>
      <input
        type="text"
        placeholder={AddCourseTexts.courseName}
        value={courseData.name}
        onChange={(e) => setCourseData({ ...courseData, name: e.target.value })}
        className="p-2 w-full border rounded-md shadow-sm mb-4"
      />
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFileData(e.target.files[0]);
          }
        }}
        className="p-2 w-full border rounded-md shadow-sm mb-4"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleSubmit}
        className="p-2 w-full bg-blue-600 text-white rounded-md hover:bg-blue-800 shadow-sm"
      >
        {adminTexts.adminAddCourse}
      </button>
    </div>
  );
};

export default AddCoursePage;
