
// migrations/20230928120002_create_course.ts

import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("Chapter")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "text")
    .addColumn("subject", "text")
    .addColumn("paragraphs", "text") // This creates an array of text
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("Chapter").ifExists().execute();
}
