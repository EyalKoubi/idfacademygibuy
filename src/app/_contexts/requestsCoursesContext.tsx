import { create } from "zustand";
import { ContentData,CourseData,CoursesState,SubjectData,ChapterData, UserState, UserRequestsCourse, UserRequestCourseState} from "@/app/types";





type CoursesActions = {

  setUserRequestsCourse: (userRequestsCourse:UserRequestsCourse[]) => void;
  addUserRequestsCourse:(user:any,course:CourseData)=>void;
  
};
const useUserRequestCourseStore = create<UserRequestCourseState & CoursesActions>((set) => ({
  userRequestsCourses: [],
  setUserRequestsCourse: (userRequestsCourse:UserRequestsCourse[]) => set((state) => {
    state.userRequestsCourses =userRequestsCourse;
    return { ...state };
  }),

  addUserRequestsCourse: (user:any,course:CourseData) => set((state) => ({
    ...state,
    userCourses: [...state.userRequestsCourses, {user,course}],
  })),
 
}));


export default useUserRequestCourseStore;
