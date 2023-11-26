"use client"
import useUserStore from "@/app/_contexts/userContext";
import CourseCard from "../courseCatalog/_components/courseCard";

const continueStading = () => {
  const {userCourses}=useUserStore();
  console.log(userCourses)
  return <>
    {userCourses.map((course,index)=>{
      return <CourseCard key={index} course={course} />
    })}
  </>;
};

export default continueStading;
