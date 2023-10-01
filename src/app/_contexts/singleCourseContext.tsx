import create from "zustand";

type Content = {
  name: string;
  fileName: string;
  comments: string;
};

type Chapter = {
  name: string;
  brief: string;
  contents: Content[];
};

type Course = {
  id: string;
  name: string;
  chapters: Chapter[];
};

type SingleCourseState = {
  course: Course | null;
};

type SingleCourseActions = {
  setCourse: (course: Course) => void;
  addChapter: (chapter: Chapter) => void;
  addContent: (chapterIndex: number, content: Content) => void;
  setCourseName: (name: string) => void;
  setChapterBrief: (chapterIndex: number, brief: string) => void;
};

const useSingleCourseStore = create<SingleCourseState & SingleCourseActions>(
  (set) => ({
    course: null,
    setCourse: (course) => set((state) => ({ ...state, course })),
    addChapter: (chapter) =>
      set((state) => {
        if (state.course) {
          state.course.chapters = [...state.course.chapters, chapter];
        }
        return { ...state };
      }),
    addContent: (chapterIndex, content) =>
      set((state) => {
        if (state.course && state.course.chapters[chapterIndex]) {
          state.course.chapters[chapterIndex].contents = [
            ...state.course.chapters[chapterIndex].contents,
            content,
          ];
        }
        return { ...state };
      }),
    setCourseName: (name) =>
      set((state) => {
        if (state.course) {
          state.course.name = name;
        }
        return { ...state };
      }),
    setChapterBrief: (chapterIndex, brief) =>
      set((state) => {
        if (state.course && state.course.chapters[chapterIndex]) {
          state.course.chapters[chapterIndex].brief = brief;
        }
        return { ...state };
      }),
  })
);

export default useSingleCourseStore;
