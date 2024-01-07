"use client"
import { FormEvent, useState } from "react";
import { AddCourseTexts, adminTexts } from "@/HebrewStrings/Texts";
import { CourseData, ContentData } from "@/app/types";
import axios, { AxiosError } from "axios";
import useCoursesStore from "@/app/_contexts/courseContext";
import { useRouter } from "next/navigation";
import useUserStore from "@/app/_contexts/userContext";
import { Loading } from "react-daisyui";
import ErrorMessage from "../_component/ErrorMessage";
import fdgd from '../../../../public/assets/default-course-image.png';

interface ErrorResponse {
  message?: string;
}

const AddCoursePage: React.FC = () => {
  const { addCourse, initinalCourse } = useCoursesStore();
  const { addNewCourseProcess } = useUserStore();
  const [isDefaultImage, setIsDefaultImage] = useState(false);
  const [editorValue,setEditorValue]=useState("")
  const [courseData, setCourseData] = useState<CourseTable>({
    id: "",
    name: "",
    img_id: null,
    creationTimestamp: null,
    chapters: [],
    subscribe_num: 0, 
    description_sub_title: "", 
    description: "",
    rate: 0, 
  });
  const [fileData, setFileData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { user, addAdminCourse } = useUserStore();

  const handleIsDefaultImageChange = (isChecked: boolean) => {
    setIsDefaultImage(isChecked);
    
    if (isChecked) {
      const defaultImageFilePath = '/default-course-image.png'
      
      const reader = new FileReader();
  
      reader.onload = (event) => {
        const result = event.target?.result;
  
        if (result instanceof ArrayBuffer) {
          const blob = new Blob([result], { type: 'image/png' });
          const file = new File([blob], 'default-image-course.png', { type: 'image/png' });
          console.log(file)
          setFileData(file);
        }
      };
  
      fetch(defaultImageFilePath)
        .then((response) => response.arrayBuffer())
        .then((arrayBuffer) => {
          reader.readAsArrayBuffer(new Blob([arrayBuffer]));
        });
    } else {
      setFileData(null);
    }
  };
  const handleEditorChange = (value) => {
    setEditorValue(value);
    setCourseData({ ...courseData, description: value }); // Update the description field in courseData
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      setLoading(true);
      let courseToServer: CourseTable = {
        id: "",
        name: courseData.name,
        img_id: null,
        creationTimestamp: new Date(),
        chapters: [],
        subscribe_num: courseData.subscribe_num,
        description_sub_title: courseData.description_sub_title,
        description: courseData.description,
        rate: courseData.rate,
      };
  
      let formData = new FormData();
      console.log(courseData.name)
      formData.append("course", JSON.stringify(courseToServer));
      formData.append("userId", user.id);
      formData.append("comments", courseData.name);
      formData.append("fileTitle", courseData.name);
      formData.append("file", fileData, fileData.name);
      console.log(fileData)
      const response = await axios.post("/api/addCourse", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data?.id) {
        addCourse(response.data);
        addAdminCourse(response.data);
        addNewCourseProcess(response.data);
        setLoading(false);
        router.push(`/home/courseManager/${response.data.id}`);
        await setCourseData(response.data);
      } else {
        setError(response.data?.message);
        setLoading(false);
      }
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      setError(
        error?.response?.data?.message ||
          error.message ||
          "An error occurred while adding the course."
      );
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
    {/* Textarea for description_sub_title */}
    <label className="block text-gray-600 mb-2">{AddCourseTexts.description_course_card}</label>
      <textarea
        placeholder={AddCourseTexts.description_course_card}
        value={courseData.description_sub_title}
        onChange={(e) => setCourseData({ ...courseData, description_sub_title: e.target.value })}
        className="p-2 w-full border rounded-md shadow-sm mb-4"
      />
  
     
      <div>
        <label className="block text-gray-600 mb-2">{AddCourseTexts.description_course}</label>
        <ReactQuill
          value={editorValue}
          onChange={handleEditorChange}
          modules={{ toolbar: true }}
          className="mb-4"
        />
      </div>
  
    
      {/* Other input fields */}
      {isDefaultImage ? (
        <div></div>
      ) : (
        <div>
          <label className="block text-gray-600 mb-2">תמונה הקורס:</label>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setFileData(e.target.files[0]);
              }
            }}
            className="p-2 w-full border rounded-md shadow-sm mb-4"
          />
        </div>
      )}
      <label className="block text-gray-600 mb-2">
        <input
          type="checkbox"
          checked={isDefaultImage}
          onChange={(e) => handleIsDefaultImageChange(e.target.checked)}
          className="mr-2"
        />
        תמונת ברירת מחדל
      </label>
      {error && <ErrorMessage message={error} />}
      {!loading ? (
        <button
          onClick={handleSubmit}
          className="p-2 w-full bg-blue-600 text-white rounded-md hover:bg-blue-800 shadow-sm"
        >
          {adminTexts.adminAddCourse}
        </button>
      ) : (
        <Loading />
      )}
    </div>
  );
  };

export default AddCoursePage;
