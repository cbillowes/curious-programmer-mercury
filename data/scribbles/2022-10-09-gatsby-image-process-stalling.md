---
title: Hack to fix Gatsby image process from stalling
cover: gatsby.png
date: 2022-10-09
credit: gatsbyjs
creditLink: https://www.gatsbyjs.org/
tags:
  - Technical
  - Hack
  - Terminal
  - Gatsby
abstract: >
  If your Gatsby image processing is stalling during development,
  here's a quick hack to help fix it by setting the CPU count.
---

Build stuck at running jobs (image transformation)

```bash
npm run clean && GATSBY_CPU_COUNT=8 npm run develop
```

- [GitHub #34051](https://github.com/gatsbyjs/gatsby/issues/34051)
