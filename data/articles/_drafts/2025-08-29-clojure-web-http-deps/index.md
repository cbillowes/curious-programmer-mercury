---
title: "Getting acquainted with Web & HTTP dependencies in Clojure"
cover: clojure-web.webp
date: 2025-08-29 00:00:00
tags:
- Clojure
- Web
- HTTP
- deps.edn
creditSource: ChatGPT-4o
creditLink: https://chatgpt.com/
---

If you are creating a web application in Clojure, you will likely need to include several dependencies in your dependency configuration file to handle various aspects of web development such as HTTP servers, routing, templating, JSON processing, and more.

This article covers some of the most commonly used libraries for this use case.

## HTTP Server

`org.eclipse.jetty/jetty-server` - [Maven](https://mvnrepository.com/artifact/org.eclipse.jetty/jetty-server)

Every web application needs an HTTP server to listen for incoming requests and send responses back to clients. This dependency is lightweight and embeds a Java HTTP server and servlet container.

Servlets are small Java classes that respond to HTTP requests. They run inside servlet containers like Jetty or Tomcat. The open a TCP port and accept HTTP requests, map requests to servlets and manage their lifecycle and concurrency (thread pools).

Jetty is lightweight and embeddable, making it a common choice for Clojure web applications. It handles low-level details of HTTP connections, request parsing, and response generation.

```clojure
(require '[ring.adapter.jetty :refer [run-jetty]])

(run-jetty handler {:port 3000})
```

## HTTP adapter

`ring/ring-jetty-adapter` - [Maven](https://mvnrepository.com/artifact/ring/ring-jetty-adapter)

Ring adapter for Jetty. Used to run the web application on Jetty’s embedded server.

The Jetty adapter is the bridge between Ring (Clojure web abstraction outlined below) and Jetty (the embedded Java HTTP server).
It translates Ring requests into Jetty requests and vice versa for responses and serves that traffic.

The Jetty adapter appears to be the most mature and reliable choice for a production Clojure web application.

## HTTP abstraction

`ring/ring-core` [GitHub](https://github.com/ring-clojure/ring)

Ring provides request/response abstractions and a middleware stack.

Ring only defines a protocol: a request is a map, a response is a map, and middleware are functions that transform handlers.

Ring is server-agnostic so you could swap in Jetty, Tomcat, HTTP Kit, or Aleph with different adapters.

Middleware are composable functions that can modify requests and responses (authentication, logging, JSON, gzip, error handling, throttling, metrics, etc).
There are also core utilities for working with cookies, parameters, file uploads, sessions, etc.

Ring provides simplicity in the form of immutable maps representing HTTP requests and responses, composability through middleware as function composition and an ecosystem of libraries built around it.

```clojure
(ns example.core
  (:require [ring.adapter.jetty :refer [run-jetty]]
            [ring.util.response :as response]
            [ring.middleware.params :refer [wrap-params]]))

;; A simple handler
(defn hello-handler [request]
  ;; `request` is a Clojure map with keys like :uri, :params, :headers
  (let [name (get-in request [:params "name"] "world")]
    (response/response (str "Hello, " name "!"))))

;; Compose middleware around the handler
(def app
  (wrap-params hello-handler))

(defn -main []
  (println "Starting server on http://localhost:3000")
  (run-jetty app {:port 3000 :join? false}))
```

### Gzip compression

`amalloy/ring-gzip-middleware` - [GitHub](https://github.com/amalloy/ring-gzip-middleware)

Ring middleware that gzips responses. Used to reduce bandwidth and improve response times when clients support gzip.

This middleware compresses HTTP responses using Gzip if supported via the `Accept-Encoding: gzip` request header.
The compression algorithm reduces payload size for the text-based content like JSON, HTML, and CSS.

## JSON encoding/decoding

`cheshire/cheshire` - [GitHub](https://github.com/dakrone/cheshire)

High-performance JSON library for Clojure. Used to encode/decode JSON for REST APIs and web responses.

This go-to library provides fast JSON parsing and generation built on top of Jackson (a Java JSON library).
Supports pretty-printing, custom encoders (for special types like dates and UUIDs) and seamless conversion between Clojure data structures and raw JSON.
It's used in Ring middleware to automatically parse JSON request bodies into Clojure maps and serialize Clojure data structures into JSON responses
but can also be used standalone to work with JSON data.

## Routing

`compojure/compojure` - [GitHub](https://github.com/weavejester/compojure)

Declarative routing DSL for Ring applications. Used to define web routes and API endpoints.

Map HTTP `GET`, `POST`, `PUT`, `DELETE` macros to define routes and handlers (Clojure functions).

Compojure does some heavy lifting by extracting parameters from the request, matching routes and dispatching to the correct handler function instead of manually matching URI patterns.

- Declare and compose HTTP routes and contexts
- Match URI patterns (eg. `/api/user/:id`)
- Extract query and path parameters automatically
- Integrate directly with Ring's request/response pipeline

## Templating engine

`com.github.jknack/handlebars` - [GitHub](https://github.com/jknack/handlebars.java)

Java implementation of Handlebars templating. Used to render HTML or text templates.

Handlebars is more powerful than pure Mustache because it allows the use of helpers, variables (`{{variable}}`), conditionals (`{{#if}}` `{{else}}` `{{/if}}`), loops (`{{#each}}`) and
partials (reusable sub-templates) while still keeping templates primarily declarative.

## HTML generation

`hiccup/hiccup` - [GitHub](https://github.com/weavejester/hiccup)

Clojure DSL for generating HTML. Instead of embedding HTML in strings, you can represent HTML elements as nested vectors which can be composed and manipulated like any other Clojure data structure.

This is handy when generating HTML at runtime such as admin pages, HTML emails, snippets of HTML, etc. You get to treat HTML as data and leverage Clojure's strengths in data manipulation.
It's safer than raw strings because it has built-in escaping to prevent injection.

## Logic-less templates

`stencil/stencil` - [GitHub](https://github.com/davidsantiago/stencil)

Mustache templating for Clojure. Used for lightweight, logic-free template rendering.

Stencil is a Clojure implementation of the Mustache templating language. It's logic-less because the templates don't allow arbitrary code, conditionals, or loops.
Instead, you define structure and placeholders (`{{name}}`) and sections (`{{#items}}...{{/items}}`) in the template that get replaced with values from a provided data map.

This is ideal for generating emails, reports or messages with dynamic content.

## HTTP client

`clj-http/clj-http` - [GitHub](https://github.com/dakrone/clj-http)

Clojure wrapper around Apache HttpClient. Used to perform HTTP requests to external services.

It provides an idiomatic Clojure API for making synchronous HTTP calls (GET, POST, PUT, DELETE, etc) with support for
connection pooling, timeouts, redirects, cookies, multipart uploads, and more and turns raw network calls into simple Clojure maps.

## OpenAPI client

`com.github.oliyh/martian-clj-http` - [GitHub](https://github.com/oliyh/martian)

Integrates Martian OpenAPI client with clj-http. Used to interact with OpenAPI-described services.

You can make validated, documented API calls directly from Clojure as it reads an OpenAPI spec (YAML/JSON) and builds a client around it.
It generates idiomatic Clojure functions that correspond to API endpoints, validates requests and responses against the schema and
reduces boilerplate by avoiding hand-rolled HTTP calls and parameter validation.
