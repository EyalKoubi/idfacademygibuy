import { create } from "zustand";
import { ContentData,CourseData,CoursesState,SubjectData,ChapterData, UserState} from "@/app/types";





type CoursesActions = {
  setUser: (user: any) => void;
  setUserCourses: (courses: CourseData[]) => void;
  addUserCourse:(course:CourseData)=>void;
  setAdminCourses: (courses: CourseData[]) => void;
  addAdminCourse:(course:CourseData)=>void;
  
};
const useUserStore = create<UserState & CoursesActions>((set) => ({
  user: null,
  userCourses: [],
  adminCourses:[],

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
  setAdminCourses: (courses: CourseData[]) => set((state) => {
    state.adminCourses = courses;
    return { ...state };
  }),

  addAdminCourse: (course: CourseData) => set((state) => ({
    ...state,
    adminCourses: [...state.adminCourses, course],
  })),
}));


export default useUserStore;
