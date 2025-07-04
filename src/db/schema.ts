import {
  timestamp,
  varchar,
  uuid,
  pgTable,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()), // onUpdate fn sets the updatedAt field to a default value whenever the row is updated.
  hashed_password: varchar("hashed_password").notNull().default("unset"),
  email: varchar("email", { length: 256 }).unique().notNull(),
  // is_chirpy_red: boolean("is_chirpy_red").default(false),
  isChirpyRed: boolean("isChirpyRed").default(false),
});

export type NewUser = typeof users.$inferInsert;
// $inferInsert is a helper type that infers the type of the object you would pass to the `insert` function. This is useful for type safecy.

export const chirps = pgTable("chirps", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()), // onUpdate fn sets the updatedAt field to a default value whenever the row is updated.
  body: varchar("body", { length: 140 }).notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export type NewChirp = typeof chirps.$inferInsert;
// $inferInsert is a helper type that infers the type of the object you would pass to the `insert` function. This is useful for type safecy.

export const refresh_tokens = pgTable("refresh_tokens", {
  token: varchar("token").primaryKey(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()), // onUpdate fn sets the updatedAt field to a default value whenever the row is updated.
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  // the timestamp when the token expires
  expires_at: timestamp("expires_at").notNull(),
  // the timestamp when the token was revoked (null if not revoked).
  revoked_at: timestamp("revoked_at"),
});

export type NewRefreshToken = typeof refresh_tokens.$inferInsert;
