
import { useEffect, useReducer, useState } from "react";
import { CourseData } from "@/app/types";
import { useRouter } from "next/navigation";
import { ChapterData } from "@/app/types";
import MediaViewer from "../[courseid]/chapters/[chapterid]/subjects/[subjectid]/contents/_components/mediaViewer";
import { LoginTexts, editTexts } from "@/HebrewStrings/Texts";
import useUserStore from "@/app/_contexts/userContext";
import axios from "axios";
import {Users} from "@/app/types"
interface CourseCardProps {
  course: CourseData;
  isPresentMode:boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course,isPresentMode}) => {
  const router = useRouter();
  const {user,userCourses,adminCourses,addUserCourse}=useUserStore();
  const [isRegister,setIsRegister]=useState(false)
  //const [isAdmin,setIsAdmin]=useState(false)

  useEffect(()=>{
    setIsRegister((userCourses.some(userCourse => userCourse.id === course.id)))
    console.log((isPresentMode))
  },[userCourses])
  // Function to format the timestamp
  const formatDate = (timestamp: Date ) => {
    const date = new Date(timestamp);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;
  };
  const registerCourse=async ()=> {
    
    let formData = new FormData();
    formData.append("courseId", course.id);
    formData.append("userId",user.id);
    const response=await axios.post("/api/registerCourse",formData)
    if(response.data?.message){
      console.log(response.data?.message)
    }
    else{
      addUserCourse(course)
    }
  }
 // const isregister=(userCourses.some(userCourse => userCourse.id === course.id))
 // const isAdmin=(adminCourses.some(admincourse => admincourse.id === course.id))
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4" >
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{course.name}</div>
        <div className="text-gray-700 text-base">
          <ul>
            {course.chapters?.map((chapter, index) => (
              <li key={index} className="mb-1">
                {chapter.name}
              </li>
            ))}
          </ul>
        </div>
        {course.img_id && <MediaViewer content={course.img_id} />}
        {course.creationTimestamp &&<p className="text-sm text-gray-500">Created on: {formatDate(course.creationTimestamp)}</p>}
        {(!isRegister)&&<button onClick={registerCourse}>{LoginTexts.register}</button>}
        {(isRegister&&isPresentMode)&&<button onClick={() => { router.push(`courseCatalog/${course.id}/chapters`) }}>{editTexts.showCourse}</button>}
      </div>
    </div>
  );
};

export default CourseCard;
