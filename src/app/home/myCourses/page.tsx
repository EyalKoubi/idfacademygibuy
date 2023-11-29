"use client"
import useUserStore from "@/app/_contexts/userContext";
import CourseCard from "@/app/home/_component/courseCard";

const myCourses = () => {
  const {userCourses}=useUserStore();
  return <>
    {userCourses.map((course,index)=>{
      return <CourseCard key={index} course={course} isPresentMode={true}/>
    })}
  </>;
};

export default myCourses;
