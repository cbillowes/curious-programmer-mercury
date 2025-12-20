---
title: Automatically update npm packages in one command
cover: npm.png
date: 2025-12-19
creditSource: Wikipedia
creditLink: https://en.wikipedia.org/wiki/Npm_(software)#/media/File:Npm-logo.svg
tags:
  - Technical
  - Tools
  - Node.js
  - JavaScript
  - Terminal
abstract: >
  Automatically update all npm packages in your project with a single command using npm-check-updates.
---

```bash
npx npm-check-updates -u && npm install
```

This command uses the `npm-check-updates` utility to automatically update all the dependencies in your `package.json` file to their latest versions.
The `-u` flag tells it to upgrade the versions in `package.json`, and the `&& npm install` part installs the updated packages.

If you don't want to install updates right away, drop the `&& npm install` part.
