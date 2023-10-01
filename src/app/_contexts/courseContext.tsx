import create from "zustand";

type Content = {
  name: string;
  fileName: string;
  comments: string;
};

type Chapter = {
  name: string;
  contents: Content[];
};

type Course = {
  id: string;
  name: string;
  brief: string;
  chapters: Chapter[];
};

type CoursesState = {
  courses: Course[];
};

type CoursesActions = {
  addCourse: (course: Course) => void;
  addChapter: (courseId: string, chapter: Chapter) => void;
  addContent: (
    courseId: string,
    chapterIndex: number,
    content: Content
  ) => void;
  setCourseName: (courseId: string, name: string) => void;
  setCourseBrief: (courseId: string, brief: string) => void;
};

const useCoursesStore = create<CoursesState & CoursesActions>((set) => ({
  courses: [],
  addCourse: (course) =>
    set((state) => ({
      ...state,
      courses: [...state.courses, course],
    })),
  addChapter: (courseId, chapter) =>
    set((state) => {
      const newCourses = [...state.courses];
      const courseIndex = newCourses.findIndex(
        (course) => course.id === courseId
      );
      if (courseIndex !== -1) {
        newCourses[courseIndex].chapters = [
          ...newCourses[courseIndex].chapters,
          chapter,
        ];
      }
      return { ...state, courses: newCourses };
    }),
  addContent: (courseId, chapterIndex, content) =>
    set((state) => {
      const newCourses = [...state.courses];
      const courseIndex = newCourses.findIndex(
        (course) => course.id === courseId
      );
      if (
        courseIndex !== -1 &&
        newCourses[courseIndex].chapters[chapterIndex]
      ) {
        newCourses[courseIndex].chapters[chapterIndex].contents = [
          ...newCourses[courseIndex].chapters[chapterIndex].contents,
          content,
        ];
      }
      return { ...state, courses: newCourses };
    }),
  setCourseName: (courseId, name) =>
    set((state) => {
      const newCourses = [...state.courses];
      const courseIndex = newCourses.findIndex(
        (course) => course.id === courseId
      );
      if (courseIndex !== -1) {
        newCourses[courseIndex].name = name;
      }
      return { ...state, courses: newCourses };
    }),
  setCourseBrief: (courseId, brief) =>
    set((state) => {
      const newCourses = [...state.courses];
      const courseIndex = newCourses.findIndex(
        (course) => course.id === courseId
      );
      if (courseIndex !== -1) {
        newCourses[courseIndex].brief = brief;
      }
      return { ...state, courses: newCourses };
    }),
}));

export default useCoursesStore;
