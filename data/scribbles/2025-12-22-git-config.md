---
title: My Git Config
cover: git.png
date: 2025-12-19
credit: Vasil Enchev
creditLink: https://dribbble.com/shots/4037272-Git-monster-illustration/attachments/925202
creditSource: dribbble.com
tags:
  - Technical
  - Git
  - Terminal
abstract: >
  This is a copy of my Git configuration file.
---

```text
[user]
    name = Clarice Bouwer
    email =
    signingKey = ""
[alias]
    pp = log --graph --abbrev-commit --decorate --date=relative --all
    st = status --short --branch
    lg = log --pretty='%C(yellow)%h%Creset | %C(yellow)%d%Creset %s %Cgreen(%c
    hist = log --pretty=format:\"%h %ad | %s%d [%an]\" --graph --date=short
    dp = diff --word-diff --unified=10
    s = status
    a = add
    cm = commit -m
    pushall = !git remote | xargs -L1 git push --all
    lg2 = log
    co = checkout
[diff]
    algorithm = histogram
[core]
    pager = less -RFX
    autocrlf = input
    editor = vim
[pull]
    rebase = false
[init]
    defaultBranch = "main"
[gpg]
    program = gpg
[commit]
    gpgSign = false
[tag]
    forceSignAnnotated = false
[color]
    ui = always
```
