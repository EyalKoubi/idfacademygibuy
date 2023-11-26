// export type CourseDataCard = {
//   name: string;
//   image: string;
//   chapters: ChapterData[];
// };

export enum Users {
  Admin = 1,
  Editor = 2,
  Creator = 3,
  User = 4,
}

export type ContentData = {
  id: string;
  file_name: string;
  comments: string;
};

export type SubjectData = {
  id: string;
  name: string;
  contents: ContentData[];
};

export type ChapterData = {
  id: string;
  name: string;
  brief: string;
  subjects: SubjectData[];
};
export type CourseData = {
  id: string;
  name: string;
  img_id:ContentData|null;
  creationTimestamp:Date|null;
  chapters: ChapterData[];
};
// export type CourseData = {
//   id: string;
//   name: string;
//   chapters: ChapterData[];
// };

export type CoursesState = {
  courses: CourseData[];
  initinalCourse:CourseData;
};
export type UserState = {
  user: any;
  userCourses:CourseData[]
}
  
