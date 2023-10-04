export type CourseDataCard = {
  name: string;
  image: string;
  chapters: ChapterData[];
};
export type ContentData = {
  id: string;
  name: string;
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
  // id: number;
  name: string;
  chapters: ChapterData[];
};
