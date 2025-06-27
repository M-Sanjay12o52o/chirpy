import { timestamp, varchar, uuid, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()), // onUpdate fn sets the updatedAt field to a default value whenever the row is updated.
  email: varchar("email", { length: 256 }).unique().notNull(),
});

export type NewUser = typeof users.$inferInsert;
// $inferInsert is a helper type that infers the type of the object you would pass to the `insert` function. This is useful for type safecy.
