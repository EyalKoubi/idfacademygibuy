// migrations/20230928120002_create_course.ts

import { Kysely, sql } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("Course")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("name","text")
    .addColumn("img_id", "text") // Assuming img_id is a text type
    .addColumn("creationTimestamp", "timestamp", (col) => col.defaultTo(sql`CURRENT_TIMESTAMP`))
    .execute();  

  await db.schema
    .createTable("Chapter")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("name", "text")
    .addColumn("brief", "text")
    // ask Amir
    // .addColumn("courseId", "uuid", (col) =>
    //   col.references("Course.id").onDelete("cascade").notNull()
    // )
    .execute();

  await db.schema
    .createTable("Subject")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("name", "text")
    // ask Amir
    // .addColumn("chapterId", "uuid", (col) =>
    //   col.references("Chapter.id").onDelete("cascade").notNull()
    // )
    .execute();

  await db.schema
    .createTable("Content")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("file_name", "text")
    .addColumn("comments", "text")
    // ask Amir
    // .addColumn("subjectId", "uuid", (col) =>
    //   col.references("Subject.id").onDelete("cascade").notNull()
    // )
    .execute();


    await db.schema
    .createTable("ContentCourse")
    .addColumn("contentId", "uuid", (col) =>
      col.references("Content.id").onDelete("cascade").notNull().unique()
    )
    .addColumn("courseId", "uuid", (col) =>
      col.references("Course.id").onDelete("cascade").notNull().notNull().unique()
    )
    .execute();

  await db.schema
    .createTable("ContentSubject")
    .addColumn("contentId", "uuid", (col) =>
      col.references("Content.id").onDelete("cascade").notNull().unique()
    )
    .addColumn("subjectId", "uuid", (col) =>
      col.references("Subject.id").onDelete("cascade").notNull()
    )
    .execute();

  await db.schema
    .createTable("SubjectChapter")
    .addColumn("subjectId", "uuid", (col) =>
      col.references("Subject.id").onDelete("cascade").notNull().unique()
    )
    .addColumn("chapterId", "uuid", (col) =>
      col.references("Chapter.id").onDelete("cascade").notNull()
    )
    .execute();

  await db.schema
    .createTable("ChapterCourse")
    .addColumn("chapterId", "uuid", (col) =>
      col.references("Chapter.id").onDelete("cascade").notNull().unique()
    )
    .addColumn("courseId", "uuid", (col) =>
      col.references("Course.id").onDelete("cascade").notNull()
    )
    .execute();


    //Account tables
    await db.schema
    .createTable("User")
    .addColumn("id", "uuid", (col) =>
      col.primaryKey().defaultTo(sql`gen_random_uuid()`)
    )
    .addColumn("name", "text")
    .addColumn("email", "text", (col) => col.unique().notNull())
    .addColumn("emailVerified", "timestamptz")
    .addColumn("image", "text")
    // .addColumn("role", "integer", (col) => col.defaultTo(1)) //need to do that its will change 
    .execute();
  
    await db.schema
      .createTable("Account")
      .addColumn("id", "uuid", (col) =>
        col.primaryKey().defaultTo(sql`gen_random_uuid()`)
      )
      .addColumn("userId", "uuid", (col) =>
        col.references("User.id").onDelete("cascade").notNull()
      )
      .addColumn("type", "text", (col) => col.notNull())
      .addColumn("provider", "text", (col) => col.notNull())
      .addColumn("providerAccountId", "text", (col) => col.notNull())
      .addColumn("refresh_token", "text")
      .addColumn("access_token", "text")
      .addColumn("expires_at", "bigint")
      .addColumn("token_type", "text")
      .addColumn("scope", "text")
      .addColumn("id_token", "text")
      .addColumn("session_state", "text")
      .execute();
  
    await db.schema
      .createTable("Session")
      .addColumn("id", "uuid", (col) =>
        col.primaryKey().defaultTo(sql`gen_random_uuid()`)
      )
      .addColumn("userId", "uuid", (col) =>
        col.references("User.id").onDelete("cascade").notNull()
      )
      .addColumn("sessionToken", "text", (col) => col.notNull().unique())
      .addColumn("expires", "timestamptz", (col) => col.notNull())
      .execute();
  
    await db.schema
      .createTable("VerificationToken")
      .addColumn("identifier", "text", (col) => col.notNull())
      .addColumn("token", "text", (col) => col.notNull().unique())
      .addColumn("expires", "timestamptz", (col) => col.notNull())
      .execute();
  
    await db.schema
      .createIndex("Account_userId_index")
      .on("Account")
      .column("userId")
      .execute();
  
    await db.schema
      .createIndex("Session_userId_index")
      .on("Session")
      .column("userId")
      .execute();

      //Users course schema
      await db.schema
    .createTable("UserCourses")
    .addColumn("userId", "uuid", (col) =>
      col.references("User.id").onDelete("cascade").notNull()
    )
    .addColumn("courseId", "uuid", (col) =>
      col.references("Course.id").onDelete("cascade").notNull()
    )
    .addColumn("role", "integer")
    .execute(); 

}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("Content").ifExists().execute();
  await db.schema.dropTable("ContentSubject").ifExists().execute();
  await db.schema.dropTable("Subject").ifExists().execute();
  await db.schema.dropTable("SubjectChapter").ifExists().execute();
  await db.schema.dropTable("Chapter").ifExists().execute();
  await db.schema.dropTable("ChapterCourse").ifExists().execute();
  await db.schema.dropTable("Course").ifExists().execute();

  await db.schema.dropTable("UserCourses").ifExists().execute();

  await db.schema.dropTable("Account").ifExists().execute();
  await db.schema.dropTable("Session").ifExists().execute();
  await db.schema.dropTable("User").ifExists().execute();
  await db.schema.dropTable("VerificationToken").ifExists().execute();

}
