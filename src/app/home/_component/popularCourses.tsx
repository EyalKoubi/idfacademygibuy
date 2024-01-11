import useCoursesStore from "@/app/_contexts/courseContext";
import CourseCard from "./courseCard";

const PopularCourses = () => {
    const {courses}=useCoursesStore()
    // Sort courses by subscribe_num in descending order and take the top 20
    const popularCourses = courses
      .slice()
      .sort((a, b) => b.subscribe_num - a.subscribe_num)
      .slice(0, 20);
      return (
        <div className="w-full bg-emerald-100 ">
        <h1 className="text-end px-8 mb-4">קורסים פופלרים</h1>
        <div className=" flex flex-col-reverse items-end gap-4">

          <div className="flex flex-wrap justify-end gap-4">
            {popularCourses.length > 0 ? (
              popularCourses.map((course, index) => (
                <div
                  key={index}
                  className={`w-full  ${
                    // Calculate order based on the index to reverse the order
                    `order-${popularCourses.length - index}`
                  }`}
                >
                  <CourseCard course={course} isPresentMode={false} />
                </div>
              ))
            ) : (
              <p className="text-center">No popular courses found.</p>
            )}
          </div>
        </div>
        </div>
      );
      
  };
  
  export default PopularCourses;