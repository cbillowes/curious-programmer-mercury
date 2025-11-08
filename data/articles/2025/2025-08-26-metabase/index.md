---
title: "Getting started with Metabase on MacOS"
cover: metabase.png
date: 2025-08-26 00:00:00
tags:
  - Metabase
  - MacOS
  - Java
  - Clojure
creditSource: Metabase
creditLink: https://www.metabase.com/docs/latest/dashboards/start
---

I'm dabbling with Metabase for data visualization and business intelligence. Here are my notes on getting it running on MacOS.

## Requirements

- Java 21
- Clojure 1.12.1
- Metabase (as of cbe38462e270ce52013f7f56776d6138fe6b44b3 Aug 28, 2025)

## Ports

You will need port 3000 and 8080 open for Metabase to run.

## Multiple Java Versions

If you have multiple Java versions installed, it can lead to conflicts.

Verify all Java installations:

```bash
/usr/libexec/java_home -V
```

Uninstall all Java installations and then reinstall a clean version.

```bash
sudo rm -rf /Library/Java/JavaVirtualMachines/*
```

```bash
brew uninstall --ignore-dependencies openjdk
```

```bash
brew install openjdk@21
```

Create a symlink for Java 21:

```bash
sudo ln -sfn /opt/homebrew/opt/openjdk@21/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-21.jdk
```

Set up environment variables and configure in zshrc (or your own shell config file):

```bash
echo 'export JAVA_HOME=$(/usr/libexec/java_home -v 21)' >> ~/.zshrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.zshrc
source ~/.zshrc
```

Verify Java version:

```bash
java -version
```

```bash
/usr/libexec/java_home -V
```

## Running Metabase

Official [instructions](https://github.com/cbillowes/metabase?tab=readme-ov-file#quick-setup-dev-environment) are available on the Metabase GitHub repository.

### Front end

Install dependencies and run with hot-reload:

```bash
yarn install
yarn build-hot
```

### Back end

```bash
clojure -M:run
```

This will start Metabase on [http://localhost:3000](http://localhost:3000). Go to <http://localhost:3000/setup/> to set up Metabase.
