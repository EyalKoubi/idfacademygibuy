"use client"
import { FormEvent, useState } from "react";
import { AddCourseTexts, adminTexts } from "@/HebrewStrings/Texts";
import { CourseData,ContentData } from "@/app/types";
import axios, { AxiosError } from "axios";
import useCoursesStore from "@/app/_contexts/courseContext";
import { useRouter } from "next/navigation";
import useUserStore from "@/app/_contexts/userContext";
import { Loading } from "react-daisyui";
interface ErrorResponse {
  message?: string;
}
const AddCoursePage: React.FC = () => {
  const { addCourse,initinalCourse } = useCoursesStore();
  const {addNewCourseProcess}=useUserStore()
  const [courseData, setCourseData] = useState<CourseData>({
    id: "",
    name: "",
    img_id:null,
    creationTimestamp:null,
    chapters: []
  });
  const [fileData, setFileData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading,setLoading]=useState<boolean>(false)
  const router = useRouter();
  const {user,addAdminCourse}=useUserStore();

  const handleSubmit = async () => {
    try{
    //setError(null);
      setLoading(true)
      let courseToServer:CourseData= {
          id: "",
          name: courseData.name,
          img_id:null,
          creationTimestamp:new Date(),
          chapters: []
      }
      let formData = new FormData();
      formData.append("course", JSON.stringify(courseToServer));
      formData.append("userId", user.id);
      formData.append("file", fileData, fileData.name);
      formData.append("comments",courseData.name);

      const response = await axios.post("/api/addCourse", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data?.id) {
        addCourse(response.data);
        addAdminCourse(response.data)
        addNewCourseProcess(response.data)
        setLoading(false)
        router.push(`/home/courseManager/${response.data.id}`);
     await setCourseData(response.data)
      } else {
        setError(response.data?.message);
        setLoading(false)
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
      {!loading?
      <button
        onClick={handleSubmit}
        className="p-2 w-full bg-blue-600 text-white rounded-md hover:bg-blue-800 shadow-sm"
      >
        {adminTexts.adminAddCourse}
      </button> :
        <Loading />
}
    </div>
  );
};

export default AddCoursePage;
