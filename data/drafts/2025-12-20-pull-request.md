---
title: Engineering a practical code change management process with version control
cover: block-tree-with-green-ticks.webp
date: 2025-12-20 00:00:00
tags:
- Git
- Version Control
- Productivity
- Process
- Continuous Delivery
- Continuous Improvement
- Accountability
creditSource: Freepik AI
creditLink: https://www.freepik.com/
abstract: >
  ...
---

Changes are risky business.
They can either work as expected; or introduce bugs, break functionality, and lead to unexpected consequences.

If you have a team of developers working together to build software, then you definitely need to ensure that the changes are managed properly.

We're going to explore the use of version control (specifically Git) and how we can create a practical framework to manage code changes effectively.

## Adopt a version control system

Version control systems are essential in software development:

- You can keep track of who made what changes and when.
- You minimize the risk of losing work.
- Collaboration becomes easier.
- You can revert to previous versions if needed.
- You can experiment freely.
- You can tag releases and milestones.

If you don't have one, it's wise to adopt one.
There are many to [choose from](https://en.wikipedia.org/wiki/List_of_version-control_software).
(This article references [Git](https://en.wikipedia.org/wiki/Git))

> If you are interested in learning Git, check out my [Gentle introduction to Git](/courses/git) course.

## Establish a branching strategy

Branches are cheap. They are like little micro-repositories that lets you isolate changes. You can experiment, develop features, and fix bugs; allowing you to work in parallel without stepping on others toes.

Your stable branch should always be deployable (e.g., `main` or `master`).
Protect them.
Developers should not be able to push directly to these branches.
Instead, create separate branches and merge them into the stable one.
This is known as continuous integration.

You could use a strategy, like [Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) or [GitHub Flow](https://docs.github.com/en/get-started/using-github/github-flow) to define how branches are created, named, and merged.

## Use meaningful commit messages

Every change you make is committed to your branch.
Each commit is a snapshot of your code at a specific point in time.
The history of commits should tell a pretty good story of its evolution.
This is important because it:

- Helps anyone (you, future you, newbies, support, etc.) understand the context of changes.
- Makes it easier to review code.
- Aids in debugging and troubleshooting.

I've seen countless commit messages verbatim to "wip", "fixed this" or "updated that".
Some are silly, like "foo" or "try again".
The lack of context makes it hard to reason about the change and near impossible to trace back issues.

Instead, create well-structured commit messages.
Git allows you to create a multi-line commit message.

The first line matters most.
It's what you read in the log.
You need to keep it as short as possible and it should encapsulate the following

- **Type**: The category of the change (e.g., feat, fix, docs, style, refactor, test, chore). This is especially great for change logs.
- **Reference**: An optional scope or reference to a ticket system entity (e.g., ticket number).
- **Summary**: A concise summary of the change. Maintain imperative mood (e.g., "Add" instead of "Added" or "Adds").
  Note that “Add audit logging for payment callbacks” beats “Add logging.”
  This reduces characters used in the title so it's condensed. Describe what changed, not how it changed.

Add an empty line followed by a more detailed description of the change.
This should encompass:

- Any relevant context (the problem being solved).
- The reasoning behind it (why you have chosen the approach you took to implement the change).
- How to test the change (so that everyone knows how the change actually works and can validate it during a code review).
- Trade-offs or alternatives considered (so that people don't have to reinvent the wheel when they investigate the change).
- Which stakeholders were involved (to identify the source of the change).

Don't focus on the implementation details as that is what the code diff is for.

Optionally, add another empty line to include a footer which provides additional information, such as links to ticket entities, issue references and discussions, or notes for breaking changes.

> It doesn't matter what casing you use as long as you are consistent :slightly_smiling_face:

## Commit early and often

Protect yourself from losing work.
Imagine you are working on a complex feature.
You've put in countless hours of thinking and effort to reach a certain point.
Your computer crashes. All that work is lost.
Be safe and avoid that devastation by committing your changes at checkpoints.

## Keep changes small and focused

I've seen some massive commits where changes span over hundreds of files.
Code diffs so hard to read that your brain conks out.
In many cases, the individual commit encapsulated multiple unrelated changes.
Having too many changes bundled into a single commit means that you can't simply revert that context without losing the other changes.

Craft your commits in such a way that they tell a logical, simple story of change.
The moment you need to use an "and" in your commit message, stop and reconsider.
[Craft smaller commits](/blog/how-to-craft-your-changes-into-small-atomic-commits-using-git) to make it easier to review, understand, investigate, and revert.
Life happens and it can be tempting to commit them at once but you don't want to mix your apples with your toaster.

## Keep your branches up to date

Keep your branches focused and short-lived.
Regularly sync your branch with the main branch to minimize divergence.
If you are collaborating on the same branch, communicate frequently, and sync your branch with origin often.
You don't want to end up wrestling a three-headed merge conflict hydra.

If you are working solo on a branch, consider rebasing your branch onto the latest main branch.

```bash
git fetch origin
git rebase origin/main
```

This “replays” your commits on top of the latest main, keeping your branch history tidy and avoiding merge commits that create non-linear graphs.

If there are conflicts, fix them, stage the changes, and continue the rebase with:

```bash
git rebase --continue
```

> **CAUTION!** Note that your history is rewritten, so it will wreck havoc if you have already pushed your branch to a shared branch.
> Collaborators will have to forcefully sync their branches risking losing their own changes.
> Only rebase local branches that haven't been shared yet.

Leverage interactive rebase to clean up your commits before pushing your changes.

```bash
git rebase -i origin/main
```

Here you can pick, drop, squash, reorder, edit your commits to create a clean, logical history.

## Format and lint your code in a separate commit

Imagine you reviewing a diff where 80% of the changes are just formatting changes.
It adds additional mental overload and makes it hard to focus on the actual functional changes.
So don't mix formatting changes with functional changes.

If you need to reformat code, do it in a separate branch.
This can be an automated step and you can use tools like [Prettier](https://prettier.io/) or [ESLint](https://eslint.org/) to maintain consistency.

Clear development guidelines on code style and formatting minimizes this step and helps reduce friction post push.

## Collaborate through pull requests

When you're collaborating on a repository, you're typically working with other humans to solve problems and build features together.
These changes are typically pushed to a shared remote branch and work is continuously being integrated.

To maintain consistency and quality in the code, it's essential to have some form of collaborative structure in place.

In GitHub there is a feature called Pull Requests (PRs) that can help you manage your changes.
GitLab has a similar feature called Merge Requests (MRs).
A PR is an invitation to review, discuss and integrate a set of intentional changes into your codebase.

You create a branch, make your changes, open a PR, get the changes reviewed, request approvals, and merge it into another branch (typically (but not always) the main or master branch of the repository).

GitHub calculates the diff between the changes of one branch into the other, highlighting the additions and deletions.
Reviewers can quickly see what has changed, leave comments, and approve or request changes before merging.

The title and description of the PR becomes the commit message.
Follow the same guidelines for commit messages to create clear and concise PRs.

## Maintain a linear history of changes

Ideally you want your main branch to be as straight as possible to avoid confusion.
Make your main branch look like one neat storyline, and not a choose-your-own-adventure book.

`img:src=/articles/git-graph-flat.webp|title=Example of a simple git graph on main`

**Tip:** Using this git command will output a graph like the one in the screenshot above.

```bash
git log --pretty='%C(yellow)%h%Creset | %C(yellow)%d%Creset %s %Cgreen(%cr)%Creset %C(cyan)[%an]%Creset' --graph
```

In contrast, you want to avoid a tangled mess of branches and merges that make it hard to follow the history of changes.

`img:src=/articles/git-history-nightmare.webp|title=Example of a complicated git graph with multiple merge commits|credit=StackOverflow|creditLink=https://stackoverflow.com/questions/45455307/how-merge-git-imerge-final-result-to-target-branch`

To achieve this, consider using "squash and merge" or "rebase and merge" strategies when integrating PRs.

## Create a deployment pipeline

## Create useful automated test suites

Automated tests are your safety net.

## Establish a code review process

## Continuously improve the process
