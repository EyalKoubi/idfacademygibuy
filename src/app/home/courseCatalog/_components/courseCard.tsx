import { useReducer } from "react";
import { CourseData } from "@/app/types";
import { useRouter } from "next/navigation";
import { ChapterData } from "@/app/types";
import MediaViewer from "../[courseid]/chapters/[chapterid]/subjects/[subjectid]/contents/_components/mediaViewer";

interface CourseCardProps {
  course: CourseData;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  console.log(course.img_id);
  const router = useRouter();

  // Function to format the timestamp
  const formatDate = (timestamp: Date ) => {
    const date = new Date(timestamp);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear().toString().slice(-2)}`;
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4" onClick={() => { router.push(`courseCatalog/${course.id}/chapters`) }}>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{course.name}</div>
        <div className="text-gray-700 text-base">
          <ul>
            {course.chapters?.map((chapter, index) => (
              <li key={index} className="mb-1">
                {chapter.name}
              </li>
            ))}
          </ul>
        </div>
        {course.img_id && <MediaViewer content={course.img_id} />}
        {course.creationTimestamp &&<p className="text-sm text-gray-500">Created on: {formatDate(course.creationTimestamp)}</p>}
      </div>
    </div>
  );
};

export default CourseCard;
