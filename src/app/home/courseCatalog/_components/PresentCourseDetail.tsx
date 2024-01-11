import { presentCourseDetailTexts } from "@/HebrewStrings/Texts";
import useCoursesStore from "@/app/_contexts/courseContext";
import { ChapterData, CourseData } from "@/app/types";
import Chapter from "../../myCourses/_components/chapter";
interface  PresentCourseDetailsProps{
        courseid:string;
}
const PresentCourseDetails: React.FC<PresentCourseDetailsProps> = ({courseid}) => {
    const { courses } = useCoursesStore();
    

    const courseToPresent = courses.find((course)=>course.id===courseid)
   const chaptersToPresent = courseToPresent ? courseToPresent.chapters : [];
    return (
      <div className="flex flex-col">
    
        {courseToPresent && (
          <><span>{presentCourseDetailTexts.descripitonOfCourse}</span>
          <div className="w-[700px] h-[400px] max-h-full text-right">
            <div dangerouslySetInnerHTML={{ __html: courseToPresent.description }} />
  
          </div>
          <div>
            <span>{presentCourseDetailTexts.subscribeNum}</span>
            {courseToPresent.subscribe_num}
          </div>
          <div>
            <span>{presentCourseDetailTexts.rateOfCourse}</span>
            {courseToPresent.rate}
          </div>
                  </>
        )}
        <br/>
        <span>{presentCourseDetailTexts.chaptersOfCourse}</span>
        <div className="flex flex-col">
          {chaptersToPresent?.map((chapter: ChapterData) => (
            <Chapter chapter={chapter} courseid={courseid} />
          ))}
        </div>
      </div>
    );
  };
  
  export default PresentCourseDetails;
  