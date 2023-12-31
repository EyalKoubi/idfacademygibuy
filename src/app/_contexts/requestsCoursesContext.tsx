import { create } from "zustand";
import { ContentData,CourseData,CoursesState,SubjectData,ChapterData, UserState, UserRequestsCourse, UserRequestCourseState} from "@/app/types";

type CoursesActions = {
  setUserRequestsCourse: (userRequestsCourse:UserRequestsCourse[]) => void;
  addUserRequestsCourse:(user:any,course:CourseData)=>void;
  removeRequestUserCourse:(user:any,course:CourseData)=>void;
};

const useUserRequestCourseStore = create<UserRequestCourseState & CoursesActions>((set) => ({
  userRequestsCourses: [],
  setUserRequestsCourse: (userRequestsCourse:UserRequestsCourse[]) => set((state) => {
    state.userRequestsCourses =userRequestsCourse;
    return { ...state };
  }),

  addUserRequestsCourse: (user:any,course:CourseData) => set((state) => ({
    ...state,
    userRequestsCourses: [...state.userRequestsCourses, {user,course}],
  })),
  removeRequestUserCourse: (user: any, course: CourseData) => set((state) => ({
    ...state,
    userRequestsCourses: state.userRequestsCourses.filter(item =>
        item.user !== user || item.course !== course
    ),
})),
 
}));


export default useUserRequestCourseStore;
