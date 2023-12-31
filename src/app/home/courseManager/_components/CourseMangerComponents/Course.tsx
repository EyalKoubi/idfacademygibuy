import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useCoursesStore from '@/app/_contexts/courseContext';
import Chapter from '../ChapterManagerComponents/Chapter';
import RenameCourse from './RenameCourse';
import ErrorMessage from '../../../_component/ErrorMessage';
import AddChapter from '../ChapterManagerComponents/AddChapter';
import { CourseData } from '@/app/types';
import { GeneralTexts, editTexts } from '@/HebrewStrings/Texts';
import useUserStore from '@/app/_contexts/userContext';

interface CourseProps {
  course: CourseData;
}

const Course = ({ course }: CourseProps) => {
  const { deleteCourse, renameCourse, addChapter } = useCoursesStore();
  const {userCourses,deleteCourseFromUser}=useUserStore();
  const [isRenameCourse, setIsRenameCourse] = useState(false);
  const [courseName, setCourseName] = useState(course.name);
  const [isSelectedCourse, setIsSelectedCourse] = useState(false);
  const [isAddChapterPressed, setIsAddChapterPressed] = useState(false);
  const [newChapterName, setNewChapterName] = useState("");
  const [newChapterBrief, setNewChapterBrief] = useState("");
  const [addChapterError, setAddChapterError] = useState('');
  const [renameCourseError, setRenameCourseError] = useState('');

  useEffect(() => {
    return () => {
      setAddChapterError('');
      setRenameCourseError('');
    };
  }, [course]);

  const handleDeleteCourse = async () => {
    try {
      const formData = new FormData();
      formData.append("courseId", course.id);
      const courseImageId=course.img_id?.id
      if(courseImageId){
        formData.append("courseImageId",courseImageId);
      }
      await axios.post("/api/deleteCourse", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      deleteCourse(course);
      deleteCourseFromUser(course)
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleRenameCourse = async () => {
    try {
      const formData = new FormData();
      const newcourse= JSON.stringify({...course,name: courseName})
 
      formData.append("courseRename", newcourse);
      const response = await axios.post("/api/editCourse", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data?.message) {
        setRenameCourseError(response.data.message);
      } else {
        renameCourse({ ...course, name: courseName });
        setIsRenameCourse(false);
      }
    } catch (error) {
      setRenameCourseError('Error occurred while renaming the course.');
      console.error('Error renaming course:', error);
    }
  };

  const handleAddChapter = async () => {
    try {
      const formData = new FormData();
      formData.append("courseAddChapter", JSON.stringify({
        id: course.id,
        name: newChapterName,
        brief: newChapterBrief,
      }));
      const response = await axios.post("/api/addChapter", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data?.message) {
        setAddChapterError(response.data.message);
      } else {
        addChapter(course.id, {
          id: response.data.id,
          name: response.data.name,
          brief: response.data.brief,
          subjects: [],
        });
        setAddChapterError('');
        setIsAddChapterPressed(false);
      }
    } catch (error) {
      setAddChapterError('An error occurred while adding the chapter.');
      console.error('Error adding chapter:', error);
    }
  };


  return (
    <div className="p-4 bg-white rounded shadow-lg">
      <div className="flex-col">
        <span className="text-lg font-bold">{course.name}</span>
        <div className="flex flex-row">
          <button
            onClick={() => {
              setIsRenameCourse(true);
              setCourseName(course.name);
            }}
            className="p-2 ml-4 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            {editTexts.rename}
          </button>
          <button
            onClick={handleDeleteCourse}
            className="p-2 ml-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            {editTexts.deleteCourse}
          </button>
          <button
            onClick={() => setIsSelectedCourse(!isSelectedCourse)}
            className="p-2 ml-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            {editTexts.showChapters}
          </button>
        </div>
      </div>

      {isRenameCourse && (
        <>
          <RenameCourse course={course} courseName={ courseName} setCourseName={setCourseName} handleRenameCourse={handleRenameCourse}/>
          <ErrorMessage message={renameCourseError} />
        </>
      )}

      {isSelectedCourse && (
        <div className="mt-4">
          <h2 className="text-2xl mb-4">{editTexts.chapters}</h2>
          <div className="flex flex-col gap-4">
            {course.chapters?.map((chapter, index) => (
              <Chapter
                key={chapter.id}
                chapter={chapter}
                courseId={course.id}
                chapterIndex={index}
              />
            ))}
            {!isAddChapterPressed && (
              <button
                onClick={() => setIsAddChapterPressed(true)}
                className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
              >
                {editTexts.addChapter}
              </button>
            )}
            {isAddChapterPressed && (
              <AddChapter
                newChapterName={newChapterName}
                setNewChapterName={setNewChapterName}
                newChapterBrief={newChapterBrief}
                setNewChapterBrief={setNewChapterBrief}
                handleAddChapter={handleAddChapter}
                setIsAddChapterPressed={setIsAddChapterPressed}
                addChapterError={addChapterError}
                editTexts={editTexts}
                GeneralTexts={GeneralTexts}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Course;
