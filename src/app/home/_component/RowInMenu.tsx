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
  const {user,userCourses,setUserCourses,setAdminCourses, setCourseProgress}=useUserStore();
  const {setUserRequestsCourse}=useUserRequestCourseStore();
  const {courses}=useCoursesStore();
  const router = useRouter();
  const getCoursesByIds = (ids: string[]) => {
    console.log(ids);
    console.log(courses)
    return ids ? courses.filter((course) => ids.includes(course.id)) : [];
}
  const requestHandlerUserCourses=async(formData:FormData,rowInfo:string)=>{
    console.log("reach to user requests")
    console.log("the row info is ",rowInfo)
    const userType:string=(rowInfo===NavBarText.myCourses)?"4":"1";
    console.log(userType)
    formData.append("userType", userType);
    // const requestString="/api/getUserCourseRequests/"+user.id+"|"+userType
    console.log("the herf is ",href)
    const response=await axios.get("/api/getUserCourses/"+user.id+"|"+userType);
    if(response.data.message){
      console.log("error to fetch data")
      
    }
    else{
      console.log(userType)
      console.log(response.data)
      const ids=response.data.coursesIds

      const coursesFromDb=await getCoursesByIds(ids)
      
      if(userType==="4"){
        console.log("the data of courses user:",response.data)
        setUserCourses(coursesFromDb)
        setCourseProgress(response.data.coursesProgress)
        console.log("the user courses are:",userCourses)
      }
      if(userType==="1") {
        console.log("the data of courses admin:",response.data)
        console.log(coursesFromDb)
        setAdminCourses(coursesFromDb)
      }
    console.log("the user courses are:",userCourses)
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
      case NavBarText.myCourses :
        requestHandlerUserCourses(formData,rowInfo)
        break;
      case NavBarText.courseManager:
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
