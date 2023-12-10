"use client"
import { FormEvent, useState } from "react";
import { AddCourseTexts, adminTexts } from "@/HebrewStrings/Texts";
import { CourseData,ContentData } from "@/app/types";
import axios, { AxiosError } from "axios";
import useCoursesStore from "@/app/_contexts/courseContext";
import { useRouter } from "next/navigation";
import useUserStore from "@/app/_contexts/userContext";
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
  const submitFile = async () =>{
    try {
      let formData = new FormData();
      formData.append("file", fileData, fileData.name);
      formData.append("comments",courseData.name);
      console.log(formData);

      const response = await axios.post("/api/addContent", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data?.message) {
          console.log(response.data?.message)
          return null;
       }
      else{
        const newCont:ContentData = response.data;
        //setIsAddingContent(false);
        //addContent(courseId, chapterId, subject.id, newCont);
        setCourseData({...courseData,img_id:newCont})
        console.log(newCont)
      return newCont;
      }

    } catch (error) {
      console.log("🚀 ~ file: Subject.tsx:38 ~ submitFile ~ error:", error);
    }
  };

  const handleSubmit = async () => {
    //setError(null);
      setLoading(true)
      let image=await submitFile();
      console.log("image from submitfile",image)
      try {
      if(image){
      let courseToServer:CourseData= {
          id: "",
          name: courseData.name,
          img_id:image,
          creationTimestamp:new Date(),
          chapters: []
      }
      console.log("courseTo server",courseToServer)
     await setCourseData(courseToServer)
      
      let formData = new FormData();
      formData.append("course", JSON.stringify(courseToServer));
      formData.append("userId", user.id);
      console.log(courseData)
   
    
        const response = await axios.post("/api/addCourse", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data)
      if (response.data?.id) {
        addCourse(response.data);
        addAdminCourse(response.data)
        addNewCourseProcess(response.data)
        setLoading(false)
        router.push(`/home/courseManager/${response.data.id}`);
      } else {
        setError(response.data?.message);
      }
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
        <p>loading....</p>
}
    </div>
  );
};

export default AddCoursePage;
