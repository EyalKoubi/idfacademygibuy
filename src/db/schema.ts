import {
  ColumnType,
  Generated,
  GeneratedAlways,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export interface Account {
  id: GeneratedAlways<string>;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
}

export interface Session {
  id: GeneratedAlways<string>;
  userId: string;
  sessionToken: string;
  expires: Date ;
}

export interface User {
  id: GeneratedAlways<string>;
  name: string | null;
  email: string;
  emailVerified: Date  | null;
  image: string | null;
}

export interface VerificationToken {
  identifier: string;
  token: string;
  expires: Date ;
}

export interface CourseTable {
  id: Generated<string>;
  name: string;
  paragraphs: string[]; 
}

export interface ParagraphTable {
  id: Generated<string>;
  courseId: string; // This is a foreign key reference to the "course" table
  content:Object;
}

export interface ContentTable {
  id: Generated<string>;
  paragraphId: string; // This is a foreign key reference to the "paragraph" table
  name: string;
  subject: string;
}


export interface Database {
  Account: Account;
  Session: Session;
  User: User;
  VerificationToken: VerificationToken;
  Course: CourseTable;
  Paragraph: ParagraphTable;
}

export type SelectUser = Selectable<User>;
export type NewUser = Insertable<User>;
export type UserUpdate = Updateable<User>;

export type SelectAccount = Selectable<Account>;
export type NewAccount = Insertable<Account>;
export type AccountUpdate = Updateable<Account>;

export type course = Selectable<CourseTable>;
export type NewCourse = Insertable<CourseTable>;
export type CourseUpdate = Updateable<CourseTable>;

