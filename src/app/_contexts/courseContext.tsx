import { create } from "zustand";

type Content = {
  name: string;
  fileName: string;
  comments: string;
};

type Subject = {
  name: string;
  contents: Content[];
};

type Chapter = {
  name: string;
  brief: string;
  subjects: Subject[];
};

type Course = {
  id: string;
  name: string;
  chapters: Chapter[];
};

type CoursesState = {
  courses: Course[];
};

type CoursesActions = {
  addCourse: (course: Course) => void;
  addChapter: (courseId: string, chapter: Chapter) => void;
  addSubject: (
    courseId: string,
    chapterIndex: number,
    subject: Subject
  ) => void;
  addContent: (
    courseId: string,
    chapterIndex: number,
    subjectIndex: number,
    content: Content
  ) => void;
  setCourseName: (courseId: string, name: string) => void;
  setChapterBrief: (
    courseId: string,
    chapterIndex: number,
    brief: string
  ) => void;
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
      const course = state.courses.find((c) => c.id === courseId);
      if (course) {
        course.chapters.push(chapter);
      }
      return { ...state };
    }),

  addSubject: (
    courseId,
    chapterIndex,
    subject // New method to add a subject
  ) =>
    set((state) => {
      const course = state.courses.find((c) => c.id === courseId);
      if (course && course.chapters[chapterIndex]) {
        course.chapters[chapterIndex].subjects.push({
          ...subject,
          contents: [],
        }); // ensure contents is initialized
      }
      return { ...state };
    }),

  addContent: (courseId, chapterIndex, subjectIndex, content) =>
    set((state) => {
      const course = state.courses.find((c) => c.id === courseId);
      if (
        course &&
        course.chapters[chapterIndex] &&
        course.chapters[chapterIndex].subjects[subjectIndex]
      ) {
        course.chapters[chapterIndex].subjects[subjectIndex].contents.push(
          content
        );
      }
      return { ...state };
    }),

  setCourseName: (courseId, name) =>
    set((state) => {
      const course = state.courses.find((c) => c.id === courseId);
      if (course) {
        course.name = name;
      }
      return { ...state };
    }),

  setChapterBrief: (courseId, chapterIndex, brief) =>
    set((state) => {
      const course = state.courses.find((c) => c.id === courseId);
      if (course && course.chapters[chapterIndex]) {
        course.chapters[chapterIndex].brief = brief;
      }
      return { ...state };
    }),
}));

export default useCoursesStore;
