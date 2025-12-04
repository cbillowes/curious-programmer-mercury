---
title: Set up the Neon database
parent: /courses/nextjs-blog
date: 2025-12-01
abstract:
  You may want to add a database to store likes on your blog posts for authenticated users.
  In this chapter, you'll set up a Neon database and use Drizzle ORM to interact with it.
---

In this chapter, you're going to do the following:

- Add a database to your project
- Set up Drizzle ORM to interact with the database
- Use the Netlify CLI
- Create a likes table
- Run migrations

## Add Neon to your project

You are going to use [Neon](https://neon.com/) as the database provider.
Neon is a serverless Postgres database that is easy to set up and use with Next.js and Netlify.
You can install the extension directly from the Netlify dashboard.

- Go to extensions in the left sidebar and search for "Neon".
- Click through and the "Install".
- A temporary database will be created for you.
- Claim the database to view it in Neon.

> At the time of writing, the Netlify DB is in beta, and is available on all pricing plans.

You can learn more about [Netlify DB](https://docs.netlify.com/build/data-and-storage/netlify-db/).

```bash
# Install the Netlify CLI
npm install --save-dev netlify netlify-cli
# Install the neon Netlify extension
npm install @netlify/neon
```

## Set up Drizzle ORM

Drizzle ORM is a TypeScript-first ORM that works great with Next.js and Postgres.
To use it, you need to install the necessary packages.

```bash
# Install drizzle for ORM support
npm install drizzle-orm
# Install the drizzle-kit for migrations
npm install -D drizzle-kit
```

## Use the Netlify CLI

You now need to link your local repository to your Netlify project with the Netlify CLI:

```bash
# Log in to your Netlify account
npx netlify login
# Connect this folder to a project on Netlify
npx netlify link
# Initialize the database with the drizzle boilerplate
npx netlify db init --boilerplate=drizzle
```

## Create a likes table

Create a `likes` table to store the likes for each blog post.
You will hook authentication up later.

```ts:title=db/schema.ts
import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

export const likes = pgTable('likes', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: varchar({ length: 255 }).notNull(),
  slug: varchar({ length: 255 }).notNull(),
});
```

## Run migrations

Generate a new migration file.
This will create a new file in the `drizzle/migrations` folder that you will need to commit to your repository.

```bash
npm run db:generate
```

Push the schema to the database:

```bash
npm run db:migrate
```

## Conclusion

Now you have a database with a likes table set up! :tada:

In the next chapter, you will learn how to add super simple authentication to your Next.js blog using Stack Auth.
