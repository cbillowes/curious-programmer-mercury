---
title: Strategies to reduce or eliminate waste in software engineering
cover: eliminate-waste.webp
date: 2025-12-10 00:00:00
tags:
- Mindset
- Productivity
- Process
- Continuous Learning
- Systems Thinking
- Lean
creditSource: Freepik AI
creditLink: https://www.freepik.com/
abstract: >
  In this article, we will explore the lean concept of waste (muda) in software engineering, how to identify common types of waste, and strategies to eliminate them.
---

Muda is a Japanese term that means "waste."
The lean manufacturing folks, with the likes of the Toyota Production System (TPS), have used this word to describe things that are useless to the customer.

There is a lot of muda in software engineering and the software folks have learned, adopted, adapted, and applied lean principles to help eliminate waste in their processes.

In this article, we are going to step deep into the guts of muda, exploring 8 types of waste, and strategies to eliminate them.
Let's dive in.

| Waste                | Category                | Core impact                                 |
| -------------------- | ----------------------- | ------------------------------------------- |
| Transportation       | Process / Communication | Information decay, delays, misalignment     |
| Inventory            | Flow                    | Slow delivery, hidden risk, stalled value   |
| Motion               | Process / Tooling       | Lost focus, inefficiency, cognitive fatigue |
| Waiting              | Flow                    | Idle time, frustration, bottlenecks         |
| Overproduction       | Product / Strategy      | Technical debt, unused features             |
| Over-processing      | Engineering / Design    | Complexity, maintenance burden              |
| Defects              | Quality                 | Rework, lost trust, operational drag        |
| Underutilized Talent | People                  | Low morale, burnout, wasted potential       |

## Transportation

Transportation waste is the unnecessary movement of information, decisions, or responsibility across people or systems.

Back in my childhood days, we played a game called "broken telephone."
Us kids would sit in a circle, and whisper a message to the kid next to us.
By the time the message made its way around the circle, it was often hilariously distorted from the original.
This is because the kids would mishear, forget, or add their own twist to the message.

`img:src=/articles/broken-telephone.webp|title=Broken telephone: A game where a message is whispered from person to person, often resulting in humorous distortions.|credit=Freepik AI|creditLink=https://www.freepik.com/pikaso/ai-image-generator`

As funny as that sounds, it illustrates our reality when we transport knowledge through multiple people.

What does a simple request for information look like in your team?
Perhaps it goes from the engineer → tech lead → analyst → product owner → architect → some psychic medium and then makes its way back down the chain.
Each handoff will take some time to relay, there can be miscommunication, context can get lost, and errors can creep in.

### Treat teams as micro-companies

Keep **decision streams** as short as possible to reduce the number of people information has to travel through.
Less people involved reduces those nasty delays, bottlenecks, miscommunication, and errors.

Equip smaller teams with **diverse skill sets** so that they can own the end-to-end delivery.
Either hire or train people with the necessary skills to reduce dependencies on others.

### Bring external communication closer

Obviously you can't escape external communication.
There are stakeholders, customers, and third-party vendors that you may need to interact with that can't be in your team.
But, you can bring them closer by involving them as much as possible throughout the decision making process.

When decisions need to be made, get everyone involved in the same room (virtually or physically).
Take minutes (use AI to help with this) to document the discussion. Specifically hone in on the decisions, outcomes, pitfalls, and the next steps.

### Document relentlessly

We're in an age of information overload, and there is a lot of knowledge pockets scattered in heads, repositories, wikis, and storage systems.
Although documentation can be seen as a chore, and get outdated real quick, document relentlessly and strategically to reduce transportation of knowledge between people.

- Document the evolution of decisions, the reasons behind them, and the context at that time.
  This way, when someone new comes along, they can understand the journey and rationale behind the current state.
- Group documentation by themes or topics to make it easier to find related information.
- Use collaboration tools (like Slack) and storage tools (like Google Drive) to keep documents in an accessible place. Share them with everyone "in-the-know" to avoid knowledge silos.
- The tools you choose should have super engineered search features to help you find what you need quickly.

### Pair, mob or swarm on tasks

Two team members can **pair** up to work on tasks together.
Three or more team members can **mob** so that more people work on the same task at the same time to get it over the line.
Team members can **swarm** by jumping in and helping out on different tasks, as needed.

These techniques are not a waste. There may be less hands on deck for other tasks temporarily, but:

- Work in progress is reduced and work can get shipped.
- These practices share knowledge in real time.
- Mistakes, blockers, and rework are reduced because there are more eyes on the work.
- Code reviews are faster because the code is reviewed as it is written.
  The external peer reviewing the code only needs to do a quick sanity check.

## Inventory

Inventory waste is the accumulation of unfinished work, tasks, or features that are not yet delivered to customers.

Take stock of your work-in-progress (WIP) inventory:

1. How many pull requests are open?
2. How many issues are unresolved?
3. How many tasks are still in progress?
4. How long have they all been open for?

This is partially done, unvalidated, and unfinished work that is just sitting there, waiting to be completed.
This is a form of waste, because it is not delivering value to customers yet.

`img:src=/articles/software-waste.webp|title=Documents and folders in the trash  depicting unfinished work as waste.|credit=Freepik AI|creditLink=https://www.freepik.com/pikaso/ai-image-generator`

### Fix the process

Piling work is a signal of a problem. Identify the root cause to address it.
Some common root causes are:

- Too much unfinished work (limit work in progress).
- Lack of skills (hire or train team members to fill the gaps).
- Unclear requirements (spec out requirements upfront with stakeholders and the team).
- Too many meetings, interruptions, or distractions (set focus blocks in calendars).
- Slow code review process (work together to streamline and speed up reviews).
- Developer pains like slow builds, flaky tests, and unreliable environments (fix the tooling and infrastructure).
- Manual or tedious testing (automate as much as possible).

### Limit the work in progress

Do you consider yourself a multitasker?
If you do, observe closely next time you "multitask."

That email you are writing while attending a meeting and answering Slack messages, are you really doing all three at the same time?
No. :exploding_head:
You have to listen to the speaker, then pause to read and think about the email, then switch to Slack to read and respond to messages.
It's simply rapid context switching and you lose information during each switch.

In my opinion, it's nearly impossible to do cognitive heavy work simultaneously.
Your automatic movements like breathing, walking, and listening to music while doodling is possible, but that's not what we consider us doing when we think of multitasking.

Every time you switch tasks, your brain needs to reorient itself.
Work on one thing at a time, do it well, and finish it before moving on to the next thing.

### Make progress clearly visible

Pick a tool that offers Kanban-style boards to visualize your work.
There are so many tools out there to pick from like Asana, Trello, Jira, or even a physical Kanban board.

Invest wisely and adopt a frictionless tool that you can set up and maintain quickly and easily.
Find something that offers most of the following:

- Create swimlane columns (like Backlog, To Do, In Progress, In Review, Done).
- Create tasks and sub-tasks with formatted detailed descriptions.
- Have the ability to comment and discuss progress and requirements within tasks.
- Upload attachments (like screenshots, documents, or code snippets).
- Assign tasks to team members.
- Set due dates and priorities.
- Add labels or tags to categorize tasks.
- Track progress with visual indicators (like progress bars or burndown charts).
- Integrate with your collaboration and build tools that you use (like Slack, GitHub, or CI/CD pipelines).

### Tame the backlog of tasks

Backlogs can be pure evil.
They can grow infinitely and become overwhelming and unmanageable to maintain.
Refine it regularly to keep it as lean and clear as possible.

Team members should not see this column on their views.
It's demotivating and reduces the temptation to pick more things up than what they can handle.

### Finish what you start

This sounds so obvious and simple, yet in practice, it is kind of hard.
If you don't finish what you start, your work piles up making delivery slow, value is not "realized" because it's not shipped, morale drops because impact is low, and customers miss out on the important things being built or fixed.

Be persistent and focus on finishing things!

- Work together on a common goal (the task at hand) to get it over the line.
- Everyone should be aligned on what to do.
- Set strict and clear definition of done (DoD) criteria to know when you can ship.
- Set up focus blocks of time in your calendar and protect them with all your might.
- Celebrate when you finish something. It builds momentum and morale.
- Take a short breather before picking up the next task to avoid sprint fatigue.

### Say "no", "not now" or what to drop

Be realistic about your capacity and capabilities.
If you are working on something, politely say "no" or "not now" to other work.
If it's important, ask what you need to drop in order to take on the other work.

Handoffs are extremely expensive.
When someone else needs to take over unfinished work, they need to spend time getting up to speed, so try hard to finish what you start instead.

### Work on smaller tasks

Reduce the scope of tasks so that you can finish it faster.
Scope work into smaller batches and release more frequently.

Adopt the use of feature flags so that you can release incomplete features safely.
Remove old flags to avoid feature flag fatigue which leads to a form of technical debt.

## Motion

Motion waste is the unnecessary movement of people, information, or tools that do not add value to the customer.

Count the number of tabs you have open in your browser right now.
And then, the number of browser windows :slightly_smiling_face:
Now count the number of applications you have running on your computer.
And desktops, and monitors :sweat_smile:

This navigation is motion and the time it takes to navigate between codebases, emails, threads, documents, wikis, ticketing systems, and so forth, adds up.

`img:src=/articles/application-chaos.webp|title=Computer screen with too many icons and applications open.|credit=Freepik AI|creditLink=https://www.freepik.com/pikaso/ai-image-generator`

### Centralize your knowledge base

Keep documentation up to date.
When you touch an outdated document, update it with the latest information you have.
Most documentation tools have version history so you can always revert if needed.
This could form part of your definition of done (DoD).

Make sure that documentation is easily searchable through repositories (like Docusaurus), internal wikis, and collaboration tools.

Create a centralized table of contents or an index of where things are located so you can safely close those tabs and windows and refer to one source of truth.
Use a tagging or categorization system to group related information together.

Knowledge silos are the enemy of productivity.
Keep it accessible to everyone who needs access to it.

### Map the system

Systems can be complex beasts.
You could be in an environment where there are multiple teams working on different parts of a larger system.
Perhaps there are hundreds of repositories, dozens of services, and many stakeholders involved.
Micro-service architectures can be particularly challenging to navigate.

Map out the architecture, dependencies, and relationships between different components to help everyone understand the big picture.
Leverage tools like Miro or use Mermaid diagrams in your markdown docs.

### Learn how to navigate through code

Clone all repositories in a single parent directory on your local machine.
Use a powerful editor or IDE that allows you to open multiple projects in one window (like VS Code), and leverage search features to quickly find domain terms, files, symbols, and references across all repositories.

You can learn so much from the domain by being curious and exploring the codebase.

### Leverage AI agents

Use AI agents to help you understand and navigate complex systems or things that don't make sense to you.
Be cognizant that AI can hallucinate, so always validate the information it provides by asking your peers.

### Reduce context switching

By now, you've learned to limit the work in progress.
You can also simplify your workflows to reduce the amount of context switching you need to do.

- Reduce the number of tools you use.
- Standardize your development environment (consider using containerization tools like Docker).
- Automate anything that is repetitive.
- Identify and remove unnecessary steps in your processes.
- Keep your boards up to date, and feel good when something is marked as done. :rocket:

### Gather requirements upfront

Don't create vague tasks that need a lot of back-and-forth later on.
Instead, create a planned column in your board.
Pull tasks from the backlog into this column once you have refined them.
Have a definition of ready (DoR) checklist to ensure that all necessary information is available.

Before starting the work, have a conversation to refresh your memory.
Things do change over time, so don't assume that the requirements you gathered earlier are still 100% up to date.
Make sure that you clearly understand the requirements, expectations, and acceptance criteria.

## Waiting

Waiting waste is the idle time when people, systems, or processes are waiting for something to happen before they can proceed.

Playing the waiting game is soul-crushingly painful.
Waiting for reviews, approvals, feedback, builds, tests, deployments, and releases can bring your productivity to a grinding halt.

`img:src=/articles/tired-person-at-laptop.webp|title=A very tired and frustrated software engineer staring at frozen laptop, hunched shoulders, sticky notes everywhere.|credit=Freepik AI|creditLink=https://www.freepik.com/pikaso/ai-image-generator`

- Make sure you have clearly defined requirements upfront.
- Optimize your workflows to reduce waiting times by working together as a team to get work over the line faster.
- Shorten feedback loops by releasing early and often.
- Reduce dependencies on others by cross-training team members and empowering them to make decisions.
- Automate repetitive tasks like testing, building, and deploying to speed up the process.
- Set clear expectations with stakeholders about timelines and deliverables to avoid unnecessary delays.
- Continuously monitor and improve your processes to identify and eliminate bottlenecks that cause waiting.

## Overproduction

Overproduction is building more than what is needed, or building things too early.

I'm guilty.
I've fallen victim to creating extra features, functionality, extra complexity, and infrastructure that was not needed.
I got so caught up in the excitement of building this new shiny thing, thinking about future requirements, and trying to be "perfect."
This is **gold plating**, **feature bloat**, and **guessing future requirements**.

Working on the hypothetical will only build up juicy technical debt that will haunt your codebase - probably forever.
Worst of all, it might never get shipped.

`img:src=/articles/software-bloat.webp|title=A software application with gold plating, feature bloat and too many icons overflowing the display, crowded toolbar details.|credit=Freepik AI|creditLink=https://www.freepik.com/pikaso/ai-image-generator`

### Validate before you build anything

Before you build anything, validate that it is actually needed by your customers.
This can be through user research, prototypes, A/B tests, or analytics.
Release early and often to get feedback from real users.

### Solve for the "now"

Adopt a “build less” mindset by challenging assumptions.
What problem are you trying to solve right now?
I'm not advocating that you get sloppy by not thinking about the future at all.
Just avoid over-engineering solutions for those hypothetical future scenarios.

### Watch out for premature optimization

Profile and monitor your applications to identify actual bottlenecks.
Optimize based on real data rather than on assumptions.

## Over-processing

Over-processing is adding more complexity, features, or processes than what is necessary to deliver value to customers.

Ever heard of "YAGNI"?
It stands for "You Aren't Gonna Need It."
Avoid adding unnecessary complexity, features, or processes that don't add value to your customers.

### Strive for simplicity

> Don't get "clever." Keep things as simple and straightforward as possible.

Complex systems don't need to be the Amazonian jungle.
Aim for simplicity, clarity, and ease of use.
Keep your code easy to read, follow, understand, and maintain.
Avoid adding speculative features and abstractions.

### Stay up-to-date with your documentation

Keep your documentation lightweight and relevant and review it regularly to ensure it remains useful and doesn't outdate like maturing eggs on a shelf.

### Shy away from perfectionism

It's costly as it takes time and effort that can be better spent on real value-adding work.

## Defects

Defect waste is the presence of bugs, errors, or issues in software that lead to rework, and customer dissatisfaction.

Defects :bug: are costly in terms of trust, reputation, time, resources, and sanity.
Pesky bugs lead to customer dissatisfaction, lost revenue, and increased maintenance costs.
They crush the spirits of those who have to fix them.

`img:src=/articles/software-bugs.webp|title=A software application with squeaky mechanical beetles emerging from the display, bits of code trailing behind.|credit=Freepik AI|creditLink=https://www.freepik.com/pikaso/ai-image-generator`

### Observe your systems

Invest in monitoring and observability tools to track the health and performance of your applications in real time.

### Keep system errors to a minimum

That means that you need to track errors in your applications using some reporting tools (like Sentry, Datadog, or New Relic).
Fix them as soon as they are reported.
Prioritize fixing critical errors that impact customers the most.
This is sometimes hard to gauge, so work directly with customer support teams to understand the impact better.

### Automate quality control

Continuous integration comes at a cost.
Engineers have different styles of writing code, and without guardrails, the codebase can become inconsistent, buggy, and even hard to maintain.
Run automated static analysis on build.
Use tools like linters (eg ESLint), type checkers (eg TypeScript), code quality analyzers (eg SonarQube), and security scanners (eg Snyk) to enforce coding standards, best practices, and keep your codebase consistent.

Continuously integrating new changes could affect existing functionality.
Create decent test coverage of logical units.
Ensure that changes are validated when continuously integrated into the main branch of your repositories.
Run them before pushing, and run them automatically on a CI/CD pipeline to catch issues early on.
Break builds when these tests fail to prevent defects from reaching production.

Introduce integration and smoke tests to validate that critical functionality works as expected in production.
This can target key user journeys that are essential to your business.

Monitor integrations so that you know when third-party services change or break.

### Keep a clean git history

Use meaningful commit messages that describe the purpose of the change.
This will help with tracking changes, debugging issues, and understanding the evolution of the codebase.

Adopt smaller batch sizes with fewer changes to make it easier to spot issues.

Prefer squashing pull requests to keep the history clean and focused on the main changes.

This is useful when incidents or defects occur.
Engineers can trace back to get a better understanding of what changed, when, and why.

## Underutilized talent

Underutilized talent is the waste of not fully leveraging the skills, knowledge, and potential of team members.

The most expensive waste in software isn’t technical. It’s human.

Some job descriptions are so broad that it appears the company needs a unicorn.
Someone who is a master of everything. :unicorn:
Then when the person joins, with all these amazing skills, they are expected to change a button from grey to blue.

`img:src=/articles/frustrated-person.webp|title=A very tired and frustrated software engineer slumped at cluttered desk, disheveled hair, empty coffee cups.|credit=Freepik AI|creditLink=https://www.freepik.com/pikaso/ai-image-generator`

This is a waste of talent, because the person is not being utilized to their full potential.

### Empower team members

Encourage team members to take ownership of their work and make decisions.
Provide opportunities for growth and development by assigning challenging tasks, offering training, and supporting career advancement.

### Foster a culture of continuous learning

Encourage team members to share their knowledge and skills with others.
Create a safe environment where people can experiment, fail, and learn from their mistakes.

### Leverage diverse skill sets

Build cross-functional teams with diverse skill sets to tackle complex problems.
If someone is good at something outside their core role, find ways to leverage that skill for the benefit of the team.

## Conclusion

I probably sound like a broken [gramophone record](https://en.wikipedia.org/wiki/Phonograph_record) by now.
There has been a lot of repetition because the strategies overlap across the different types of waste.

- Inventory amplifies waiting
- Motion increases defects
- Overproduction creates future inventory
- Defects cause waiting and firefighting

Waste can probably not be eliminated completely, but it can be reduced by being aware of it, identifying it, and taking action to address it.

Waste costs money, time, resources, and sanity.
Why not pick something crucial from the list this week, and optimize for it? :rocket:

## References

- [Toyota Production System](https://en.wikipedia.org/wiki/Toyota_Production_System) - Wikipedia
- [Lean Software Development](https://www.geeksforgeeks.org/software-engineering/lean-software-development-lsd/) - GeeksforGeeks
- [The 7 Lean Wastes: How to Identify and Optimize Your Workflow](https://businessmap.io/lean-management/value-waste/7-wastes-of-lean) - BusinessMap
- [7 Wastes of Software Development](https://activecollab.com/blog/project-management/the-first-principle-of-lean-management-eliminate-waste) - ActiveCollab
