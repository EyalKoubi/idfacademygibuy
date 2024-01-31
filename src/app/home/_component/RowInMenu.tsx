"use client"
import { NavBarText } from "@/HebrewStrings/Texts";
import useCoursesStore from "@/app/_contexts/courseContext";
import useAppState from "@/app/_contexts/globalContext";
import useUserRequestCourseStore from "@/app/_contexts/requestsCoursesContext";
import useUserStore from "@/app/_contexts/userContext";
import { UserRequestsCourse } from "@/app/types";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Form } from "react-daisyui";

interface RowInMenu {
  href: string;
  rowInfo: string;
  icon: React.ReactNode;
  isSideBar:boolean;
}

const RowInMenu:React.FC<RowInMenu> = ({ rowInfo, href, icon,isSideBar }) => {
  const { isMenuButtonPressed } = useAppState();
  const {user,setUserCourses,setAdminCourses, setCourseProgress}=useUserStore();
  const {setUserRequestsCourse}=useUserRequestCourseStore();
  const {courses}=useCoursesStore();
  const router = useRouter();
  const getCoursesByIds=(ids:string[])=>{
    return courses.filter((course)=>ids.includes(course.id)) //if use filter without {} in the expresion
  }
  // const getCoursesByIds = (ids:string[]) => {
  //   console.log(courses);
  //   return courses.filter((course) => ids.includes(course.id));
  // };
  const requestHandlerUserCourses=async(formData:FormData,rowInfo:string)=>{
    console.log("reach to user requests")
    const userType:string=rowInfo===NavBarText.myCourses? "4":"1";
    console.log(userType)
    formData.append("userType", userType);
    // const requestString="/api/getUserCourseRequests/"+user.id+"|"+userType
    const response=await axios.get("/api/getUserCourses/"+user.id+"|"+userType);
    if(response.data.message){
      console.log("error to fetch data")
    }
    else{
      console.log(response.data)
      if(userType==="4"){
        console.log(response.data)
        const courses=await getCoursesByIds(response.data.coursesIds)
        console.log(courses)
        setUserCourses(getCoursesByIds(response.data.coursesIds))
        setCourseProgress(response.data.coursesProgress)
      }
      if(userType==="1")  
        setAdminCourses(getCoursesByIds(response.data))
    router.push(href);
  }
}
const requestUserPremision=async()=>{
  const response=await axios.get("/api/getUserCourseRequests/"+user.id);
  if(response.data.message){
    console.log("error to fetch data")
  }
  else {
    const requests: UserRequestsCourse[]=response.data.map((request:{user:any,courseId:string})=>{
      return {
        user:request.user,
        course:courses.find((course)=>course.id===request.courseId) 
      };
    });
    setUserRequestsCourse(requests); // Update the state with 'requests'
  }
 
  router.push(href);
}

  const clickHandeller = () => {
    console.log(rowInfo)
    console.log("reach to handler ")
    //if (!isMenuButtonPressed) return; //for do if its icons menu its will be clickable
    let formData = new FormData();
    formData.append("userId", user.id);
    switch (rowInfo) {
      case NavBarText.logout:
        signOut({ redirect: false }).then(() => {
          router.push(href);
        });
        break;
      case NavBarText.myCourses ||NavBarText.myCourses:
        requestHandlerUserCourses(formData,rowInfo)
        break;
      case NavBarText.premsionManager:
        requestUserPremision()
        break;  
      default:
        router.push(href);
    }
  };

  return (
    <div className="flex items-center justify-end">
      <button  onClick={clickHandeller}>
        <div className="flex justify-between items-center space-x-1">  
           {((isSideBar&&isMenuButtonPressed)||!isSideBar) &&<div className="min-w-32">
              <i className="fas fa-home"></i> {rowInfo}
            </div>}
           {icon}
        </div>
      </button>
    </div>
  );
};

export default RowInMenu;
