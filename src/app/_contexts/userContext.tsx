import { create } from "zustand";
import { ContentData,CourseData,CoursesState,SubjectData,ChapterData, UserState} from "@/app/types";





type CoursesActions = {
  setUser: (user: CourseData) => void;
  
};

const useUserStore = create<UserState & CoursesActions>((set) => ({
  user: null,
  setUser: (
   user:any
  ) =>
    set((state) => {
      state.user = user;
      return { ...state };
    }),

}));

export default useUserStore;
