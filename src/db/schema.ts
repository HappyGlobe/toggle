import {
  pgTable,
  text,
  serial,
  timestamp,
  integer,
  point,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = pgTable("toggle_users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const entries = pgTable("toggle_entries", {
  id: serial("entry_id").primaryKey(),
  datetime: timestamp("entry_datetime").defaultNow(),
  userId: integer("entry_user_id")    // Changed from text to integer
    .notNull()
    .references(() => users.id),
  happinessLevel: integer("entry_happiness_level"),
  location: point("entry_location").notNull(),
  country: text("entry_country").notNull(),
  region: text("entry_region").notNull(),
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;
