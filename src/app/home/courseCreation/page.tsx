"use client";
import { useState } from "react";
import { AddCourseTexts, adminTexts } from "@/HebrewStrings/Texts";
import Chapter from "./_components/Chapter";
import { CourseData } from "./types";
import axios from "axios";
import useSingleCourseStore from "@/app/_contexts/singleCourseContext";
import useCoursesStore from "@/app/_contexts/courseContext";

const CoursePage = () => {
  const [chaptersCounter, setChaptersCounter] = useState<number>(0);
  const { course } = useSingleCourseStore();
  const { courses } = useCoursesStore();
  const [courseData, setCourseData] = useState<CourseData>({
    id: 0,
    name: "",
    chapters: [],
  });
  const [courseApproved, setCourseApproved] = useState<boolean>(false);

  const handleChapterAdd = () => {
    setChaptersCounter(chaptersCounter + 1);
    setCourseData({ id: 0, name: "", chapters: [] });
  };

  const handleApproveCourse = async () => {
    try {
      const formData: any = new FormData();
      formData.append("name", courseData.name);
      const response = await axios.post("/api/courseAdd", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const jsonData = await response.json();
      // if (response.json()) {
      //   throw new Error("Failed to approve course");
      // }

      console.log("Course approved and added to DB:", response);
      setCourseApproved(true);
    } catch (error) {
      console.error("Error:", error);
      // Handle error (set some state to show an error message to the user, for example)
    }
  };

  return (
    <div>
      <h1>{adminTexts.adminAddCourse}</h1>
      <input
        type="text"
        placeholder={AddCourseTexts.courseName}
        value={courseData.name}
        onChange={(e) => setCourseData({ ...courseData, name: e.target.value })}
      />
      <button onClick={handleChapterAdd}>{AddCourseTexts.addChapter}</button>
      {courseApproved ? (
        <p>Course Approved!</p>
      ) : (
        <button onClick={handleApproveCourse}>
          {AddCourseTexts.courseSubmit}
        </button>
      )}
      {new Array(chaptersCounter).map((element, index) => {
        return <Chapter key={index} />;
      })}
    </div>
  );
};

export default CoursePage;
