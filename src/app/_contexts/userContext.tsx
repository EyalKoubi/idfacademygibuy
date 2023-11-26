import { create } from "zustand";
import { ContentData,CourseData,CoursesState,SubjectData,ChapterData, UserState} from "@/app/types";





type CoursesActions = {
  setUser: (user: any) => void;
  setUserCourses: (courses: CourseData[]) => void;
  addUserCourse:(course:CourseData)=>void;
  
};
const useUserStore = create<UserState & CoursesActions>((set) => ({
  user: null,
  userCourses: [],

  setUser: (user: any) => set((state) => {
    state.user = user;
    return { ...state };
  }),

  setUserCourses: (courses: CourseData[]) => set((state) => {
    state.userCourses = courses;
    return { ...state };
  }),

  addUserCourse: (course: CourseData) => set((state) => ({
    ...state,
    userCourses: [...state.userCourses, course],
  })),
}));


export default useUserStore;
