---
title: How to get a list of Git commits for a given file
devTo: https://dev.to/cbillowes/how-to-get-a-list-of-git-commits-for-a-given-file-15og
date: 2022-01-19
cover: git.png
credit: Vasil Enchev
creditLink: https://dribbble.com/shots/4037272-Git-monster-illustration/attachments/925202
tags:
  - Technical
  - Git
  - Terminal
  - Tip
abstract: >
  Need to get a list of all Git commits for a specific file?
  Here's a simple command to help you do just that.
---

> This includes cases where the file has been renamed.

```bash
git log --follow filename.ext
```

More [Stack Overflow](https://stackoverflow.com/questions/30443906/git-log-follow-show-all-commits-including-merges):
`git log --follow`, show all commits including merges
