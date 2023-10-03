import { ChapterData, CourseData } from "../../courseCreation/types";

interface CourseCardProps {
  course: CourseData;
}
const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
      {/* <img className="w-full" src={course.image} alt={course.name} /> */}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{course.name}</div>
        <div className="text-gray-700 text-base">
          <ul>
            {course.chapters.map((chapter, index) => (
              <li key={index} className="mb-1">
                {chapter.name} {/* Assuming each chapter has a name property */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
