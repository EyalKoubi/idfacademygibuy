
import { Kysely } from "kysely";
//daisyUi , shadsn
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable("User")
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn("name", "text")
    .addColumn("email", "text", (col) => col.unique().notNull())
    .addColumn("emailVerified", "timestamptz")
    .addColumn("image", "text")
    .execute();
}123123123
xzcxzc
export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable("User").ifExists().execute();
}