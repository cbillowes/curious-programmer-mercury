---
title: "Working with Clojure dependencies"
cover: clojure-deps.webp
date: 2025-08-28 00:00:00
tags:
- Clojure
- deps.edn
creditSource: ChatGPT-4o
creditLink: https://chatgpt.com/
---

Have you ever opened a build/dependency configuration file like `deps.edn` and `project.clj` file to be show a monstrous list of dependencies and wondered :scream: what they all do? :thinking:

Clojure, just like many other dependency-dependent ecosystems, has its fair share of dependencies with some profound or cute names making it tricky to keep track of what they do.

Dependencies are the make up of your project as they expose functionality that you use in your codebase.

In this article, we will explore how to work with dependencies in Clojure, including how to pick them, structure them, and keep them up-to-date.

## How they work

Clojure relies on the JVM ecosystem for dependencies. They are fetched from Maven repositories as JAR files. Common community repositories are [Clojars](https://clojars.org/) and [Maven Repository](https://mvnrepository.com/repos/central).

Your dependency file (typically `deps.edn` for Clojure CLI or `project.clj` for Leiningen) will host a list of dependencies that your project needs to function. :rocket:

You specify them in the file by `group-id/artifact-id` and version. Eg. (`org.clojure/clojure "1.11.1"`).

When you run your application, the CLI or Leiningen, etc, will basically read the dependency file, resolve the dependencies, download the necessary JAR files from the specified repositories (if they are not in your cache), and make them available on the classpath (ordered set of JARs and directories) for your application to use.

The dependencies are cached locally in your `~/.m2/repository` directory.

:warning: If multiple versions of the same lib are pulled in:

- The last one on the classpath wins (Clojure CLI is deterministic).
- This can cause version conflicts (a.k.a. dependency hell).

`clj -Stree` (Clojure CLI) shows dependency trees.

`lein deps :tree` for Lein.

Use these to spot version conflicts and force overrides.

## Picking dependencies

The moment you start integrating a dependency in your project, you are bound to its API and any future changes that it may bring, so make your choices wisely.
If the functionality already exists in official Clojure-land, it's preferable to use that first. If it doesn't work out for you, then you can look for alternatives.

Try to determine the industry go-to for your requirement. The more popular the dependency, the more tried-by-the-community it is.

Always check the license and vulnerabilities (CVEs - Common Vulnerabilities and Exposures) of the dependency. Use it appropriately and give credit where it's due. Honor the license.
You can use [clj-watson](https://github.com/clj-holmes/clj-watson) to check for CVEs in your dependencies.

In some cases, the dependency could lie dormant for over a decade which could be totally fine if it is stable and does what you need it to do.
In other cases, you may want something with recent activity and a good pull request merging energy.

Documentation, examples and a good API clarity are important factors too, because they help you get going and reduce friction when integrating.

> Check out [Awesome Clojure](https://github.com/razum2um/awesome-clojure) for a curated list of awesome Clojure libraries and resources to help you.

## Structuring your dependencies

Instead of just slapping dependencies in your configuration files, why not list them in a structured way and add a brief description of its purpose in your project with a link to its repo?

Consider grouping dependencies by category (e.g., web, database, testing, etc) and sorting them alphabetically within each group.

This is useful for you and other contributors to understand the nature of the dependency in the project.

Example:

```clojure:title=deps.edn
{:deps
 {;; -------- Clojure --------
  ;; The Clojure programming language.
  ;; https://github.com/clojure/clojure
  org.clojure/clojure {:mvn/version "1.12.0"}

  ;; -------- Web libraries --------
  ;; Routing library for Ring applications.
  ;; https://github.com/weavejester/compojure
  compojure {:mvn/version "1.7.1"}
  ;; Core Ring library for handling HTTP requests and responses.
  ;; https://github.com/ring-clojure/ring
  ring/ring-core {:mvn/version "1.15.0-RC1"}

  ;; -------- Database libraries --------
  ;; JDBC wrapper for Clojure.
  ;; https://github.com/clojure/java.jdbc
  org.clojure/java.jdbc {:mvn/version "0.7.12"}

  ;; -------- Testing libraries --------
  ;; Alternative testing framework with a focus on readability.
  ;; https://github.com/marick/Midje
  midje/midje {:mvn/version "1.10.10"}
 }}
```

## Keeping dependencies up-to-date

Keep on top of new releases to benefit from bug fixes, security patches, and new features.

Use [antq](https://github.com/liquidz/antq) to scan your dependency file and check for outdated dependencies.

To date, it currently supports at least deps.edn, Shadow-cljs, Leiningen, and Boot and requires `Clojure 1.10.0` or later.

Add an alias to your project (in this case `deps.edn`) to run `clojure -M:outdated` and it will check for outdated dependencies and print a report to the console.
(or run `clojure -M:outdated` for Clojure CLI Tool 1.10.1.645 or earlier).

```clojure
{
 :aliases
 {:outdated {;; Note that it is `:deps`, not `:extra-deps`
             :deps {com.github.liquidz/antq {:mvn/version "RELEASE"}}
             :main-opts ["-m" "antq.core"]}}
}
```

## Conclusion

Managing dependencies is a crucial aspect of Clojure development. By carefully selecting, structuring, and keeping them up-to-date, you can ensure a more maintainable and secure codebase that contributors can easily get started on.

Happy coding!

## References

[Deps and CLI Guide](https://clojure.org/guides/deps_and_cli) - Clojure
[tools.deps](https://github.com/clojure/tools.deps) - GitHub
[Tools using tools.deps.alpha](https://github.com/clojure/tools.deps.alpha/wiki/Tools) - GitHub
