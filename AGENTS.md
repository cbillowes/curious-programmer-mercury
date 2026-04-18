# Curious Programmer - Agent Reference

This website is Clarice Bouwer's personal blog and portfolio. Domain: `curiousprogrammer.dev`. Active since 2015.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

---

## Important

**Before every update:**
You are contributing to my production personal blog website in Next.js.
It is important that the code is clean, well-structured, and follows best practices.
You should also ensure that the website is functional, responsive and accessible.

**After every update:**

- Update the stack and project layout in AGENTS.md when changes are made to either.
- Run `npm run format` to format all files.
- Run `npm run lint` to check for linting errors.
- Always lock dependencies in package.json to specific versions, never use version ranges (e.g., ^1.0.0 or ~1.0.0).

---

## Stack

| Category            | Technology                       | Version        | Notes                                                                                                      |
| ------------------- | -------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------- |
| Framework           | Next.js                          | 16.2.4         | App Router, TypeScript, React 19                                                                           |
| Language            | TypeScript                       | 6              | Strict mode, target ES2017                                                                                 |
| Styling             | Tailwind CSS                     | 4              | Via `@tailwindcss/postcss`                                                                                 |
| UI Components       | Flowbite React                   | 0.12.17        | Theme configured in `components/theme.ts`                                                                  |
| Content Management  | `@content-collections/core`      | 0.15.0         | Markdown files transformed at build time                                                                   |
| Markdown Rendering  | `react-markdown`                 | —              | With `remark-gfm` + `rehype-raw`; custom overrides in `components/markdown.tsx`                            |
| Syntax Highlighting | `react-syntax-highlighter`       | —              | Used in `components/code-block.tsx`                                                                        |
| Diagrams            | Mermaid                          | 11.14.0        | Via `components/mermaid.tsx`                                                                               |
| Authentication      | Stack Auth (`@stackframe/stack`) | 2.8.84         | GitHub + Google OAuth providers                                                                            |
| Database            | Neon (PostgreSQL)                | —              | Via `@netlify/neon`; accessed through Drizzle ORM                                                          |
| ORM                 | Drizzle ORM                      | 0.45.2         | Schema in `db/schema.ts`, migrations in `drizzle/`                                                         |
| Search              | Algolia                          | —              | `algoliasearch` 5.50.2 + `@docsearch/react` 4.6.2 + `react-instantsearch`; indexed via `scripts/search.js` |
| Analytics           | Google Analytics                 | —              | Via `@next/third-parties` 16.2.4                                                                           |
| Comments            | Utterances                       | —              | Dynamically injected in `components/comments.tsx`; repo `cbillowes/curious-programmer-mercury`             |
| SEO                 | `next-seo` + `next-sitemap`      | 7.2.0 / 4.2.3  | Plus native Next.js metadata API                                                                           |
| Icons               | `react-icons`                    | 5.6.0          |                                                                                                            |
| Data Fetching       | SWR                              | 2.4.1          |                                                                                                            |
| Hosting             | Netlify                          | —              | Netlify Dev proxy, Netlify Neon database                                                                   |
| Fonts               | Google Fonts                     | —              | Open Sans + Fira Code via `next/font/google`                                                               |
| Linting             | ESLint                           | 9.39.4         | `eslint-config-next`                                                                                       |
| Formatting          | Prettier                         | —              | With `prettier-plugin-tailwindcss` + `@ianvs/prettier-plugin-sort-imports`                                 |
| Validation          | Zod                              | 4.3.6          | Used in content-collections schema definitions                                                             |
| Media Processing    | `sharp` + `ffmpeg`               | 0.34.2 / 0.0.4 | Via Node scripts in `scripts/`                                                                             |

---

## NPM Scripts

| Script                    | Purpose                                                 |
| ------------------------- | ------------------------------------------------------- |
| `npm run dev`             | Start dev server + nodemon image watcher (concurrently) |
| `npm run build`           | Production build                                        |
| `npm run start`           | Start production server                                 |
| `npm run lint`            | Run ESLint                                              |
| `npm run format`          | Format all files with Prettier                          |
| `npm run format:check`    | Check formatting without writing                        |
| `npm run search:index`    | Push content to Algolia (requires `.env.production`)    |
| `npm run images:optimize` | Batch optimize images in `public/` to 80% quality       |

---

## Environment Variables

See `.env.example` for all required variables.

| Variable                                   | Purpose                                                     |
| ------------------------------------------ | ----------------------------------------------------------- |
| `NEXT_PUBLIC_ALGOLIA_APP_ID`               | Algolia application ID                                      |
| `NEXT_PUBLIC_ALGOLIA_SEARCH_KEY`           | Algolia public search key                                   |
| `NEXT_PUBLIC_WEBSITE_URL`                  | Canonical URL (defaults to `https://curiousprogrammer.dev`) |
| `ALGOLIA_API_KEY`                          | Algolia admin key (server-side, for indexing)               |
| `NEXT_NEON_DATA_API_URL`                   | Neon data API URL                                           |
| `NEXT_PUBLIC_STACK_PROJECT_ID`             | Stack Auth project ID                                       |
| `NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY` | Stack Auth publishable key                                  |
| `STACK_SECRET_SERVER_KEY`                  | Stack Auth server secret                                    |
| `NETLIFY_DATABASE_URL`                     | PostgreSQL connection string (Neon via Netlify)             |

---

## Content Structure

Content lives in `data/` and is processed at build time by `content-collections`.

### Articles (`data/articles/YYYY/YYYY-MM-DD-slug.md`)

- Organized in year subdirectories (2015–2026)
- Route: `/blog/<slug>`
- Key frontmatter: `title`, `date`, `cover`, `credit`, `creditSource`, `creditLink`, `abstract`, `summary`, `tags[]`, `featured`, `slug` (optional override)
- `timeToRead` and `abstract` are computed at build time

### Scribbles (`data/scribbles/YYYY-MM-DD-slug.md`)

- Short-form tips/notes; flat directory
- Route: `/scribbles/<slug>`
- Same frontmatter pattern as articles; may include `devTo` URL

### Courses (`data/courses/<course-name>/`)

- 4 courses: `full-stack`, `git`, `jamstack`, `nextjs-blog`
- Each has `index.md` (course root) and numbered page files `NN-slug.md`
- Routes: `/courses/<slug>` (index) and `/course/<slug>/<NN>/<page-slug>` (pages)
- Course pages require authentication

### Resume (`data/resume/`)

- ~35 files, one per role/education entry
- Route: `/resume/<slug>`
- Frontmatter includes a `resume:` object with `name`, `company`, `jobTitle`, `type`, `arrangement`, `location`, `start`, `end`, `tech[]`, `logo`, `category`

### Drafts (`data/drafts/`)

- Not wired into any content collection — not published, ignored by the build

---

## Markdown Custom Directives

Custom inline code directives supported in `components/markdown.tsx`:

| Directive                               | Effect                              |
| --------------------------------------- | ----------------------------------- |
| `` `youtube:URL` ``                     | Embeds YouTube iframe               |
| `` `gif:filename:caption=...` ``        | Renders GIF player with still frame |
| `` `alert:type=...:message` ``          | Renders an alert box                |
| `` `tags:tag1,tag2` ``                  | Renders pink badge tags             |
| `` `badge:className,text=...` ``        | Renders Flowbite badge              |
| `` `pronounce:word` ``                  | Renders inline code style           |
| `` `img:...` ``                         | Renders ArticleImage component      |
| Fenced code ` ```lang :title=filename ` | Syntax highlighted block with title |

Emoji shortcodes are processed via `node-emoji` before markdown rendering.

---

## Key Conventions

1. **Pinned dependencies** — no `^` or `~` ranges in `package.json`; always use exact versions.
2. **Path alias** — `@/` maps to the project root (not `src/`).
3. **Content alias** — `content-collections` maps to `.content-collections/generated` (build-time generated types).
4. **`lib/` is for data access** — pure getter functions wrapping content-collections and the database.
5. **`db/` is for database logic** — Server Actions (`'use server'`) and the Drizzle client; requires authenticated Stack Auth user.
6. **`components/` is flat** — all ~40 components live directly in the directory without subdirectories.
7. **Hero images** in `public/hero/` have auto-generated share images in `public/share/` (same name, `.jpg`) used for OG meta tags.
8. **`/about` redirects to `/resume`** via middleware in `proxy.ts`.
9. **Course pages require sign-in** — `CourseContent` shows a sign-in prompt for unauthenticated users.
10. **`/my/` is auth-protected** — `app/my/layout.tsx` enforces authentication with a hard redirect.

---

## Project Layout

```text
/
├── AGENTS.md                        # Agent instructions (this file)
├── README.md                        # Auth provider links + dev command
├── package.json                     # Manifest, pinned versions, npm scripts
├── next.config.ts                   # Next.js config: content-collections + flowbite plugins, image remotePatterns
├── content-collections.ts           # Defines all 4 content collections (articles, scribbles, courses, resume)
├── tsconfig.json                    # TS config; path aliases: @/* → root, content-collections → .content-collections/generated
├── drizzle.config.ts                # Drizzle ORM config; reads NETLIFY_DATABASE_URL
├── proxy.ts                         # Next.js middleware: /about → /resume redirect; injects x-url header
├── netlify.toml                     # Netlify Dev: port 3000 → 8888 proxy
├── nodemon.json                     # Watches public/**/* and runs GIF/share-image scripts on change
├── .env.example                     # Documents required env vars
│
├── app/                             # Next.js App Router
│   ├── layout.tsx                   # Root layout: StackProvider, ThemeProvider, fonts, GA, cookie banner
│   ├── page.tsx                     # Home page: hero, tag categories, featured articles
│   ├── globals.css
│   ├── sitemap.ts                   # Dynamic sitemap
│   ├── blog/
│   │   ├── page.tsx                 # Full article list
│   │   └── [slug]/page.tsx          # Single article OR year-filtered list
│   ├── scribbles/
│   │   ├── page.tsx                 # All scribbles list
│   │   └── [slug]/page.tsx          # Single scribble or year-filtered list
│   ├── courses/[slug]/page.tsx      # Course index page
│   ├── course/[slug]/[number]/[pageSlug]/page.tsx  # Individual course page
│   ├── tags/page.tsx                # All tags taxonomy
│   ├── tag/[tag]/page.tsx           # Content by tag
│   ├── resume/[slug]/page.tsx       # Individual resume entry
│   ├── my/                          # Auth-protected section
│   │   ├── layout.tsx               # Requires authenticated user (hard redirect)
│   │   ├── bookmarks/page.tsx
│   │   └── likes/page.tsx
│   ├── handler/[...stack]/page.tsx  # Stack Auth UI (sign-in, sign-up, account)
│   ├── community/page.tsx
│   ├── privacy/page.tsx
│   └── api/
│       ├── search/route.ts          # GET — returns all content as JSON for Algolia indexing
│       ├── bookmark/route.ts        # Bookmark CRUD (requires auth)
│       └── like/route.ts            # Like/favorite CRUD (requires auth)
│
├── components/                      # All shared React components (flat, ~40 files)
│   ├── header.tsx                   # Nav bar + collapsible sidebar
│   ├── footer.tsx
│   ├── page.tsx                     # Page wrapper (Header + Footer)
│   ├── markdown.tsx                 # ReactMarkdown renderer with custom directive handling
│   ├── content.tsx                  # ArticleContent, ScribbleContent, CourseContent, ResumeContent
│   ├── code-block.tsx               # Syntax-highlighted code block
│   ├── hero.tsx                     # Hero image with credit attribution
│   ├── preview.tsx                  # Article card/preview
│   ├── search.tsx                   # Algolia DocSearch widget
│   ├── comments.tsx                 # Utterances comment widget
│   ├── bookmark.tsx                 # Bookmark toggle (server action)
│   ├── like.tsx                     # Like toggle (server action)
│   ├── mermaid.tsx                  # Mermaid diagram renderer
│   ├── gif-player.tsx               # GIF player with still-frame toggle
│   └── theme.ts                     # Flowbite theme configuration
│
├── lib/                             # Server-side data access and utilities
│   ├── articles.ts                  # getArticles(), getArticlesByYear(), getArticlesByYearOrSlug()
│   ├── scribbles.ts                 # getScribbles(), getScribbleBySlug(), getScribblesByYearOrSlug()
│   ├── courses.ts                   # getCourses(), getCourseBySlug(), getCoursePages()
│   ├── resume.ts                    # getResume(), getResumeBySlug()
│   ├── tags.ts                      # getTags(), prettifyTag(), getByTag()
│   ├── config.ts                    # Env var constants (Algolia, website URL, Stack Auth, IS_DEV)
│   └── utils.ts                     # cn(), toDateString(), extractExcerpt(), toHeroImageUrl(), slugify(), getPageMetadata()
│
├── db/                              # Database layer
│   ├── index.ts                     # Drizzle client (Neon HTTP driver)
│   ├── schema.ts                    # Tables: favorites (likes), bookmarks
│   ├── bookmarks.ts                 # Server Actions: addToBookmarks(), getBookmarks(), deleteBookmark()
│   └── likes.ts                     # Server Actions: addToLikes(), getLikes(), deleteLike()
│
├── hooks/
│   ├── use-auth.tsx                 # useAuth() — wraps Stack Auth useUser()
│   └── use-click-outside.tsx        # useClickOutside() — outside click detection
│
├── stack/
│   ├── client.tsx                   # StackClientApp (token store: nextjs-cookie)
│   └── server.tsx                   # StackServerApp
│
├── data/                            # Static content (processed by content-collections at build time)
│   ├── sidebar.ts                   # sidebarItems array + getGroup() helper
│   ├── tags.ts                      # Tag taxonomy: categories → subcategories → tags
│   ├── articles/YYYY/               # Articles organized by year (2015–2026)
│   ├── scribbles/                   # Short-form posts (flat directory)
│   ├── courses/                     # 4 courses with index.md + numbered pages
│   ├── resume/                      # ~35 resume entry files
│   └── drafts/                      # Unpublished drafts (not wired into any collection)
│
├── scripts/                         # Node.js utility scripts
│   ├── search.js                    # Pushes content to Algolia index
│   ├── optimize-images.js           # Batch image optimization via sharp
│   ├── process-gifs.js              # GIF processing (nodemon trigger)
│   └── share-images.js              # Converts hero/ images to share/ JPEGs for OG tags
│
├── drizzle/                         # Drizzle migration SQL files
│
└── public/                          # Static assets
    ├── hero/                        # Article/page hero images (.webp, .jpg, .png)
    ├── share/                       # Auto-generated OG share images (.jpg) from hero/
    ├── articles/                    # Per-article images referenced in markdown
    └── logos/                       # Company/employer logos used in resume
```
