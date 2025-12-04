---
title: Upgrade your dependencies
parent: /courses/nextjs-blog
date: 2025-12-02
abstract:
  In this chapter, you will learn how to automatically upgrade your project dependencies using npm-check-updates.
---

You will notice that over time your packages will become outdated.
To keep your project up to date, and secure (example [CVE-2025-66478](https://nextjs.org/blog/CVE-2025-66478) with Next.js' React Server Components (RSC) protocol), it's important to regularly update your dependencies.

In this chapter, you're going to do the following:

- Use npm-check-updates on your project to upgrade your dependencies to their latest versions.
- Create a script to automate this process in the future.

## Upgrade your dependencies

To automatically update all npm packages in a project to their latest versions, including potential major version upgrades, the `npm-check-updates` tool is commonly used.

```bash
npx npm-check-updates --upgrade # or -u for short
```

This command will update the `package.json` file with the latest versions of all dependencies.
After running the command, you need to install the updated packages:

```bash
npm install
```

## Automate dependency upgrades

To make it easier to upgrade your dependencies in the future, you can create a shell script.

```bash:title=upgrade-dependencies.sh
#!/bin/bash

npx npm-check-updates -u && npm install
```

Make the script executable:

```bash
chmod +x upgrade-dependencies.sh
```

Now, whenever you want to upgrade your dependencies, simply run:

```bash
./upgrade-dependencies.sh
```

This will update your `package.json` file and install the latest versions of your dependencies.

Don't forget to test your application after upgrading dependencies to ensure everything works as expected!

## Conclusion

Keeping your dependencies up to date is crucial for maintaining the security and functionality of your Next.js blog.
By using `npm-check-updates` and automating the process with a script, you can easily manage your project's dependencies over time.

In the next chapter, you'll conclude your Next.js blog course and prepare for launch!
