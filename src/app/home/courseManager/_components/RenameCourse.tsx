import { GeneralTexts, editTexts } from "@/HebrewStrings/Texts";
import { CourseData } from "@/app/types";
import { Dispatch, SetStateAction } from "react";
interface RenameCourseProps{
  course:CourseData
  setCourseName:Dispatch<SetStateAction<string>>
  handleRenameCourse:(course: CourseData)=>Promise<void>
}

const RenameCourse:React.FC<RenameCourseProps> = ({course,setCourseName,handleRenameCourse}) => {
  return ( 
    <>
          <input
            type="text"
            placeholder={editTexts.courseName}
            value={course.name}
            onChange={(e) => {
              setCourseName(e.target.value);
            }}
            className="p-2 ml-4 border rounded"
          />
          <button
            onClick={() => handleRenameCourse(course)}
            className="p-2 ml-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            {GeneralTexts.submit}
          </button>
        </>
   );
}
 
export default RenameCourse;