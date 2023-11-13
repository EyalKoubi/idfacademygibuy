"use client"
import { useState } from "react";
import { AddCourseTexts, adminTexts } from "@/HebrewStrings/Texts";
import { CourseData } from "@/app/types/types";
import axios, { AxiosError } from "axios";
import useCoursesStore from "@/app/_contexts/courseContext";
import { useRouter } from "next/navigation";
interface ErrorResponse {
  message?: string;
}

const AddCoursePage: React.FC = () => {
  const { addCourse } = useCoursesStore();
  const [courseData, setCourseData] = useState<CourseData>({
    id: "",
    name: "",
    chapters: [],
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    setError(null);
    try {
      const formData = new FormData();
      formData.append("course", JSON.stringify(courseData));
  
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
