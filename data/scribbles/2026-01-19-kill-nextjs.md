---
title: How to kill an orphaned Next.js dev server
date: 2026-04-18
tags:
  - Technical
  - Tip
  - Terminal
abstract: >
  Do you have an orphaned Next.js dev server holding port 3000 captive? Here's a clean, safe command to kill it and avoid port conflicts.
---

Next.js dev servers can get orphaned — if your terminal crashes, you close a tab, or a script exits unexpectedly, the next dev process keeps running in the background, holding port 3000 captive.

Running this command is a clean, safe way to sweep those zombie processes before starting a fresh dev server, avoiding the dreaded `EADDRINUSE: address already` in use port conflict error or having the dev server open on a new port.

```bash
pkill -f "next dev" 2>/dev/null; echo "Stopped any running Next.js dev server"
```

Let's break it down:

- pkill sends a termination signal (`SIGTERM`) to matching processes

- `-f` matches against the full command line, not just the process name — so it finds processes where next dev appears anywhere in the command string
  This kills any process running next dev, which is the Next.js development server

- `2>/dev/null` Redirects stderr (file descriptor 2 - see below) to /dev/null (the void)
  Suppresses the error message pkill prints when no matching process is found — keeps output clean whether or not a server was actually running

- `; echo "..."` The `;` runs the echo unconditionally (regardless of pkill's exit code)
  Prints a confirmation message so you know the command ran

---

## File descriptors

In Unix, every process gets three standard file descriptors opened automatically:

| FD  | Name   | Default destination      |
| --- | ------ | ------------------------ |
| 0   | stdin  | keyboard input           |
| 1   | stdout | terminal (normal output) |
| 2   | stderr | terminal (error output)  |

FD 2 (stderr) is where programs write error messages and diagnostics — separate from regular output so you can redirect them independently.

That's why `2>/dev/null` silences only errors while letting normal output through, and why `>/dev/null` (shorthand for `1>/dev/null`) silences only normal output.
