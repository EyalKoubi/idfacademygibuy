import { useReducer } from "react";
import { CourseData } from "@/app/types";
import { useRouter } from "next/navigation";
import { ChapterData } from "@/app/types";
import MediaViewer from "../[courseid]/chapters/[chapterid]/subjects/[subjectid]/contents/_components/mediaViewer";

interface CourseCardProps {
  course: CourseData;
}
const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  console.log(course)
  const router=useRouter();
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4" onClick={()=>{router.push(`courseCatalog/${course.id}/chapters`)}}>
      {/* <img className="w-full" src={course.image} alt={course.name} /> */}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{course.name}</div>
        <div className="text-gray-700 text-base" >
          <ul>
            {course.chapters?.map((chapter:ChapterData, index:number) => (
              <li key={index} className="mb-1">
                {chapter.name}
              </li>
            ))}
          </ul>
         
        </div>
        {course.img_id&&<MediaViewer content={course.img_id}/>}
      </div>
    </div>
  );
};

export default CourseCard;
