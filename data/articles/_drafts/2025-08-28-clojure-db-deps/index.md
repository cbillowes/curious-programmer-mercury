---
title: "Getting acquainted with Database & SQL dependencies in Clojure"
cover: clojure-db.webp
date: 2025-08-28 00:00:02
tags:
- Clojure
- Database
- SQL
- deps.edn
creditSource: ChatGPT-4o
creditLink: https://chatgpt.com/
---

In this article, we explore the Database and SQL dependencies used in the Metabase Clojure deps.edn file.

## SQL generation

`com.github.seancorfield/honeysql` [GitHub](https://github.com/seancorfield/honeysql)

A Clojure library for generating SQL from Clojure data structures. Instead of hand-writing SQL strings, you build queries as maps/vectors and HoneySQL renders them into valid SQL.

Use this to dynamically construct SQL queries across many databases (filters, joins, aggregations) in a safe, composable way.

## JDBC wrapper

`com.github.seancorfield/next.jdbc` [GitHub](https://github.com/seancorfield/next-jdbc?utm_source=chatgpt.com)

Modern, lightweight wrapper around Java’s JDBC API, designed to replace `org.clojure/java.jdbc`.
Use it to execute SQL queries and retrieve results across all supported databases.

## Connection pool

`com.mchange/c3p0` [GitHub](https://github.com/swaldman/c3p0)

A mature JDBC connection pooling library for Java. It manages database connections efficiently to handle concurrent queries without overwhelming the DB.

## Connection pool wrapper

`metabase/connection-pool` [GitHub](https://github.com/metabase/connection-pool)

Metabase’s own thin wrapper around C3P0, simplifying JDBC connection pool management.
It provides a uniform way to manage and configure connection pools for each database driver.

## Database drivers

| Database | Driver | Link |
|----------|--------|------|
| Embdedded | `com.h2database/h2` | [GitHub](https://github.com/h2database/h2database) |
| Postgres | `org.postgresql/postgresql` | [GitHub](https://github.com/pgjdbc/pgjdbc) |
| MariaDB | `org.mariadb.jdbc/mariadb-java-client` | [GitHub](https://github.com/mariadb-corporation/mariadb-connector-j) |
| MySQL | `org.mariadb.jdbc/mariadb-java-client` | [GitHub](https://github.com/mariadb-corporation/mariadb-connector-j) |
| SQL Server | `com.microsoft.sqlserver/mssql-jdbc` | [Maven](https://mvnrepository.com/artifact/com.microsoft.sqlserver/mssql-jdbc)

## Excel data

### Apache POI core

`org.apache.poi/poi` [GitHub](https://github.com/apache/poi)

Read and write Microsoft Office file formats (Excel, Word, PowerPoint) from Clojure. Provides low-level support for exporting query results into Excel spreadsheets.

### Apache POI OOXML

`org.apache.poi/poi-ooxml` [GitHub](https://github.com/apache/poi)

Extension of POI for handling Open Office XML formats (.xlsx, .docx). Used for reading/writing modern Office files.

`org.apache.poi/poi-ooxml-full` [GitHub](https://github.com/apache/poi)

A full build of POI’s OOXML support, bundling extra schemas and features.

### Excel export

`dk.ative/docjure` [GitHub](https://github.com/mjul/docjure)

A Clojure library that wraps Apache POI for a friendlier API.
Implements the feature that lets users download query results as Excel files.
