import { pgTable, text, timestamp, serial, integer } from 'drizzle-orm/pg-core';
import { usersSync } from 'drizzle-orm/neon';

export const favorites = pgTable('favorites', {
  id: serial('id').primaryKey().notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => usersSync.id),
  slug: text('slug').notNull(),
  order: integer('order_number').notNull().default(0),
  dateAdded: timestamp('date_added', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const bookmarks = pgTable('bookmarks', {
  id: serial('id').primaryKey().notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => usersSync.id),
  slug: text('slug').notNull(),
  dateAdded: timestamp('date_added', { withTimezone: true })
    .defaultNow()
    .notNull(),
});
