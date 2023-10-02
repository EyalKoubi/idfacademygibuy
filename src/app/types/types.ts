export type CourseDataCard = {
  name: string;
  image: string; // Added this line to include an image URL
  chapters: ChapterData[];
};
export type ContentData = {
  name: string;
  file_name: string;
  comments: string;
};

export type SubjectData = {
  name: string;
  contents: ContentData[];
};

export type ChapterData = {
  name: string;
  brief: string;
  subjects: SubjectData[];
};

export type CourseData = {
  // id: number;
  name: string;
  chapters: ChapterData[];
};




