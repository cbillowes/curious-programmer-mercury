---
title: Getting started with Netlify
parent: /courses/nextjs-blog
date: 2025-12-01
abstract:
  In this chapter, you will learn how to create a Netlify account, and deploy your Next.js blog.
---

Netlify is a popular platform for deploying static sites and serverless functions.
It provides an easy way to host your Next.js blog with continuous deployment from your Git repository.

In this chapter, you're going to do the following:

- Create a Netlify account
- Add and configure a new project
- Deploy and access your Next.js blog online

## Create a Netlify account

Sign up at [Netlify](https://www.netlify.com/) if you don't have an account yet.

## Add and configure a new project

Log in to your account to see the dashboard.

- Add a new project by importing an existing repository.
- Deploy your project with (GitHub, GitLab, Bitbucket, or Azure DevOps).
- Authorize Netlify to access your repository.
- Find and select your repository.
- Complete the following:
  - Project name
  - Update defaults like branch to deploy, build command (`npm run build`), and publish directory (`.next`) if they are not detected correctly or automatically
  - There are no environment variables to set for this project, yet

## Deploy and access your Next.js blog online

Your application will now be built and [deployed](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/#next-js-runtime) on Netlify.

Once you push your changes, the build will be triggered automatically, and your site will be updated.
You can turn this feature off if you want to manually deploy your site.

Your project overview page will show you all your deploys.

Click on **Project configuration** to get your website URL to preview your site.

If you have your own domain name you can set it up in the **Domain management** section.

Note that the **Next.js Server Handler** function supports all Next.js features including API routes, server components, and ISR (Incremental Static Regeneration).

If you have specific environment variables you used in development, you will need to configure them in the **Environment variables** section.
If you change these variables, you will need to redeploy your site.

## Conclusion

Your blog is now live! :tada: Check it out in the cloud :smile:
You can [check out](https://curious-nextjs-blog-template.netlify.app/) the example of this tutorial blog from Netlify.

In the next chapter, you will learn how to get started with your database to add likes to your blog pages.
