import { GeneralTexts, editTexts } from "@/HebrewStrings/Texts";
import { CourseData } from "@/app/types";
import { Dispatch, SetStateAction } from "react";
interface RenameCourseProps{
    course:CourseData
    courseName:string
    setCourseName:Dispatch<SetStateAction<string>>
    handleRenameCourse:(courseName:string) => Promise<void>;
}
 
const RenameCourse:React.FC<RenameCourseProps> = ({course,courseName,setCourseName,handleRenameCourse}) => {
    return (  
        <> 
    <input
        type="text"
        placeholder={editTexts.courseName}
        value={courseName}
        onChange={(e) => {
          setCourseName(e.target.value);
        }}
        className="p-2 ml-4 border rounded"
      />
      <button
        onClick={() => handleRenameCourse(courseName)}
        className="p-2 ml-2 bg-green-500 text-white rounded hover:bg-green-700"
      >
        {GeneralTexts.submit}
      </button> 
      </> 
    )
}
 
export default RenameCourse;