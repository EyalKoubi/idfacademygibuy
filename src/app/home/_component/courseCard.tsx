
import { useEffect, useReducer, useState } from "react";
import { CourseData } from "@/app/types";
import { useRouter } from "next/navigation";
import { ChapterData } from "@/app/types";
import MediaViewer from "./mediaViewer";
import ErrorMessage from './ErrorMessage';
import { CourseCardTexts, HomeTexts, LoginTexts, editTexts } from "@/HebrewStrings/Texts";
import useUserStore from "@/app/_contexts/userContext";
import axios from "axios";
import {Users} from "@/app/types"
import useUserRequestCourseStore from "@/app/_contexts/requestsCoursesContext";
import { calculateProgress, findFirstUnwatched } from "@/utils/progressfunction";
import { Progress, RadialProgress } from "react-daisyui";
interface CourseCardProps {
  course: CourseData;
  isPresentMode:boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course,isPresentMode}) => {
  const router = useRouter();
  const {user,userCourses,adminCourses,addUserCourse,coursesProgress}=useUserStore();
  const {userRequestsCourses,addUserRequestsCourse}=useUserRequestCourseStore();
  const [currCourseProgress,setCurrCourseProgress]=useState(coursesProgress.find(cp=>cp.courseId===course.id))
  const [isRegister,setIsRegister]=useState(false)
  const [registererror,setRegistererror]=useState('')
  const [isRequested,setIsRequested]=useState(false)
  //const [isAdmin,setIsAdmin]=useState(false)

  useEffect(()=>{
    setIsRegister((userCourses.some(userCourse => userCourse.id === course.id)))
    setIsRequested((userRequestsCourses.some(userrequestCourse => (userrequestCourse.course?.id === course.id)&&(userrequestCourse.user.id === user.id))))
    const curcourseprogress=coursesProgress.find(cp=>cp.courseId===course.id)
    if(curcourseprogress)
      setCurrCourseProgress(curcourseprogress)
  
  },[course])

  // Function to format the timestamp
  const formatDate = (timestamp: Date ) => {
    const date = new Date(timestamp);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;
  };
  useEffect(()=>{console.log("userCourseRequest",userRequestsCourses)},[userRequestsCourses])
  const registerCourse=async ()=> {
    
    let formData = new FormData();
    formData.append("courseId", course.id);
    formData.append("userId",user.id);
    const response=await axios.post("/api/registerCourse",formData)
    if(response.data?.message){
      setRegistererror("problem to register please try again")
    }
    else{
      addUserRequestsCourse(user,course)
      setIsRequested(true)
    }
  } 

return (
  <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4 text-right">
    <div className="px-6">
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
      {course.img_id && <MediaViewer content={course.img_id} isPresentMode={false} />}
      {<ErrorMessage message={registererror} />}
      {course.creationTimestamp && (
        <p className="text-sm text-gray-500">{CourseCardTexts.createOn} {formatDate(course.creationTimestamp)}</p>
      )}
      {(!isRegister && !isRequested) && <button className="p-2 ml-1 bg-pink-500 text-white rounded hover:bg-yellow-600"onClick={registerCourse}>{LoginTexts.register}</button>}
      {isRequested && <p className="text-blue-700">{CourseCardTexts.requestContinueToApprove}</p>}
      {(isRegister && isPresentMode) && (
        <div><button className="p-2 ml-1 bg-green-500 text-white rounded hover:bg-green-600"  onClick={()=>{findFirstUnwatched(course,router,coursesProgress);}}>{HomeTexts.continueStanding}</button> 
          <button  className="p-2 ml-1 bg-yellow-500 text-white rounded hover:bg-yellow-600" onClick={() => { router.push(`myCourses/${course.id}/chapters`) }}>{editTexts.showCourse}</button>
        
          <p>{CourseCardTexts.progress} {calculateProgress (course,currCourseProgress?.contentProgress)}%</p>
          <div className="flex flex-col items-end gap-y-2 ">
            <Progress  color="success" value={calculateProgress (course,currCourseProgress?.contentProgress)} />
          </div>
       
        </div>
      )}
    </div>
  </div>
);
};
export default CourseCard;
