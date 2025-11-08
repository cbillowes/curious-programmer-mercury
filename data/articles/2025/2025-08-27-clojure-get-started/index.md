---
title: "Getting started with Clojure using the Clojure CLI tools on MacOS"
cover: clojure-main.webp
date: 2025-08-27 00:00:00
tags:
- Clojure
- MacOS
creditSource: ChatGPT-4o
creditLink: https://chatgpt.com/
---

The official Clojure [website](https://clojure.org/guides/deps_and_cli) offers everything you need to get started with Clojure using the Clojure CLI tools.
This article summarizes the key points to help you get set up quickly on MacOS.

## Prerequisites

### Install Homebrew

If you don't have [Homebrew](https://brew.sh/) installed, open your terminal and run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Java

Clojure is hosted on the Java Virtual Machine (JVM), so you need to have a Java Development Kit (JDK) installed.
The Clojure tools need to have Java accessible via the `PATH` or `JAVA_HOME` environment variable.
Check out the [official instructions](https://clojure.org/guides/install_clojure#java) for more information.

```bash
brew install --cask temurin@21
```

Verify it's installed.

```bash
java --version
```

Find the path of the Java installation.

```bash
which java
```

Add your path to your shell to register the path on shell start up, replacing `<<JAVA_PATH>>` with the actual path you found above.

```bash
echo 'export PATH="<<JAVA_PATH>>:$PATH"' >> ~/.zshrc
```

### Clojure CLI tools

Install the Clojure CLI tools using Homebrew.

```bash
brew install clojure/tools/clojure
```

Or upgrade if you already have it installed.

```bash
brew upgrade clojure/tools/clojure
```

## Create a new project

Create a new directory for your project and navigate into it.

```bash
mkdir my-clojure-project
cd my-clojure-project
```

Create a `deps.edn` file to manage your project dependencies.

```clojure
{:paths ["src"]
 :deps {org.clojure/clojure {:mvn/version "1.12.0"}}}
```

Add a `src` directory for your source code and `test` directory for your tests.

```bash
mkdir src
```

Create a simple Clojure file in the `src` directory, e.g., `core.clj`.
Namespace the file according to its directory structure.
In this example we will create a core.clj file in the `my-clojure-project` namespace.

```bash
mkdir -p src/my_clojure_project
touch src/my_clojure_project/core.clj
```

```clojure
(ns my-clojure-project.core
  (:gen-class))

(defn -main [& args]
  (println "Hello, Clojure!"))
```

Run your project from the terminal.

```bash
clojure -M -m my-clojure-project.core
```

## Add useful aliases

Your deps.edn contains dependencies as well as paths to numerous directories that need to be compiled or included in the classpath.
You can also add aliases to your deps.edn file to simplify common tasks.
Here are some useful aliases to consider adding:

```clojure
{:paths ["src" "test"]
 :deps {org.clojure/clojure {:mvn/version "1.12.0"}}
 :aliases
 {:run {:main-opts ["-m" "my-clojure-project.core"]}
  :repl {:main-opts ["-M:repl/rebel"]}
  :test {:extra-paths ["test"]
         :extra-deps {io.github.cognitect-labs/test-runner
                      {:git/tag "v0.5.1" :git/sha "dfb30dd"}}
         :main-opts ["-m" "cognitect.test-runner"]}}}
```

Now you can run `clj -M:run` to execute your main function, `clj -M:repl` to start a REPL session with Rebel Readline, and `clj -M:test` to run your tests.

## Using clj-new

For more complex projects, consider using a scaffolding tool like `clj-new` to generate a project template.
It standardizes the project layout so you don't need to hand-roll, working directly with `deps.edn` and directories
so no additional scaffolding required (Leiningen or Boot) and it's compatible with community templates.

Add the `:new` alias to your user-level `deps.edn` file located at `~/.clojure/deps.edn`.

```clojure
{:aliases
 {:new {:extra-deps {seancorfield/clj-new {:mvn/version "1.2.399"}}
        :exec-fn clj-new/create
        :exec-args {}}}}
```

```bash
clj -X:new :template app :name my-first/app
cd my-first.app
clj -M -m my-first.app
```

## Polylith

Think of [Polylith](https://polylith.gitbook.io/polylith/) as a way to build numerous Clojure applications using reusable components.
It encourages you to break your repository into smaller, independent pieces called components with numerous entry points and deployable chunks.
These pieces can be developed, tested, and maintained separately, making your codebase more modular and easier to manage.

### Using the tool

> [Refer](https://cljdoc.org/d/polylith/clj-poly/0.2.22/doc/install) to the official instructions to install the poly tool.

```bash
brew install polyfy/polylith/poly
```

The poly script is now installed and added to the system path. The script uses Java to launch the poly tool.

### Use as a dependency

You could simply add the `:poly` alias to your user-level `deps.edn` file located at `~/.clojure/deps.edn` like what we did for `clj-new`.

```clojure
{:aliases {:poly {:extra-deps {polylith/clj-poly {:mvn/version "0.2.22"}}
                  :main-opts  ["-m" "polylith.clj.core.poly-cli.core"]}}}
```

```bash
clj -M:poly create workspace myworkspace
cd myworkspace
```

Scaffolding will look as follows:

```bash
myworkspace/
 ├── deps.edn        ;; workspace deps
 ├── components/     ;; reusable building blocks
 ├── bases/          ;; entry points that call components
 ├── projects/       ;; deployable apps/tools
 ├── development/    ;; dev configs and REPL profile
 └── workspace.edn   ;; Polylith workspace config
```

Use the following `poly` commands to create new lego blocks in your application.

| Command | Description |
|---------|-------------|
| workspace | Create a new Polylith workspace |
| component | Create a standalone component |
| base | Create a base (API entrypoint) that uses components |
| project | Create a deployable project that uses bases and components |
