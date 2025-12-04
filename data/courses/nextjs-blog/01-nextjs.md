---
title: Create a new Next.js project
parent: /courses/nextjs-blog
date: 2025-11-30
abstract:
  Create a new blog project powered by Next.js - a popular React framework for building web applications.
  In this chapter, you will learn how to set up a new Next.js project and run the development server.
---

Next.js is a popular React framework for building server-side rendered (SSR) and statically generated web applications.
I chose Next.js for my blog because of its performance, scalability, and developer experience.
It is extensible and offers a great ecosystem of plugins and tools.
It has built-in support for features like routing, API routes, and image optimization.

In this chapter, you're going to do the following:

- Create a new Next.js project.
- Install the necessary dependencies.
- Run the development server.

## Prerequisites

System requirements:

- Minimum Node.js version: 20.9
- Operating systems: macOS, Windows (including WSL), and Linux.

Next.js supports modern browsers with zero configuration:

- Chrome 111+
- Edge 111+
- Firefox 111+
- Safari 16.4+

You can configure polyfills to target specific browsers by following the [supported browsers](https://nextjs.org/docs/architecture/supported-browsers) instructions.

## Installation

You can get started with [Next.js](https://nextjs.org/) using the following commands using the package manager of your choice.
I'm going to use `npm` in this tutorial.

```bash
npx create-next-app@latest my-next-blog --yes
cd my-next-blog
```

> Follow the [quick start](https://nextjs.org/docs/app/getting-started/installation#quick-start) instructions from the Next.js documentation for other package managers.

This command will choose the recommended defaults to get TypeScript, ESLint, Tailwind CSS, App Router out of the box.
At the time of writing, you will have a new project with Next.js 16 and React 19.

You can check for outdated dependencies using `npm outdated` and update them by running:

```bash
npx npm-check-updates -u
npm install
```

## Running the development server

To run the development server, use the following command:

```bash
npm run dev
```

Open <http://localhost:3000> with your browser to see the result.
If port `3000` is already in use, you will be prompted to use another port, such as `3001`.
You can specify a different port by setting the port in your `package.json` file or by using the `-p` flag:

```json
"scripts": {
  "dev": "next dev -p 3001",
},
```

## Conclusion

You have successfully created a new Next.js project and run the development server.

In the next chapter, you will learn how to configure the dead-simple Content Collections library, so that you can get started with writing blog posts using Markdown.
