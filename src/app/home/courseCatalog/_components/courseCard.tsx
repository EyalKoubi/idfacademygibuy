import { useReducer } from "react";
import { CourseData } from "@/app/types";
import { useRouter } from "next/navigation";
import { ChapterData } from "@/app/types";

interface CourseCardProps {
  course: CourseData;
}
const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const router=useRouter();
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
      {/* <img className="w-full" src={course.image} alt={course.name} /> */}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{course.name}</div>
        <div className="text-gray-700 text-base" onClick={()=>{router.push(`courseCatalog/${course.id}/chapters`)}}>
          <ul>
            {course.chapters.map((chapter:ChapterData, index:number) => (
              <li key={index} className="mb-1">
                {chapter.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
