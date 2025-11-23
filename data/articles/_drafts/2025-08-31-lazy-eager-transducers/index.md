---
title: "Lazy sequences vs eager collections & transducers in Clojure-land"
cover: clojure-data.webp
date: 2025-08-31 00:00:00
tags:
- Clojure
- Performance
- Data
creditSource: ChatGPT-4o
creditLink: https://chatgpt.com/
---

In all honesty, I realized today that I am a programmer typing out code without truly understanding the underlying concepts on Clojure. Guilty!
As I have been working adequately with Clojure for a while, I thought I should really start understanding the differences between numerous concepts and terminology because it's actually very important.

In today's "I'm sorry, I have sinned" episode, I will focus on diving deep into lazy sequences, eager collections, and transducers.

I've really seen some horrors affecting performance because of misunderstanding concepts or people preferring readability instead.
Sure, readability is paramount but when a small Clojure app runs in the cloud clocking in at 4GB of memory, you may want to reconsider your stance on performance because the costs add up quickly. I've been looking at transducers and believe when that written expressively, they're just as readable as lazy chaining.

> So, I've been doing some digging and I might get things wrong. If you spot anything, drop it in a comment below or create a pull request on the [GitHub repo](https://github.com/cbillowes/curious-programmer-mercury), please.

Moving along, here's what I've picked up so far:

> Laziness is a great way to defer work until you absolutely need it. It's got a few nasties when it comes to side effects and memory leaks.
> Eager operations are predictable and they're safe when it comes to side effects, but they also come at a cost. They can be heavy and waste unnecessary resources like memory for unneeded upfront work.
> Transducers are the holy grail, but some people fear them because of the learning curve. They are reusable, efficient pipelines that avoid creating intermediate sequences.

## Lazy sequences

Deferring work until you absolutely need it is the essence of lazy sequences (or "lazy seq"). This means that data is only computed once you have "realized" the result (asked for it).
It sounds glamorous knowing that you can process infinite or partially consumed data streams without doing unnecessary upfront work. But, as anything that sounds too good to be true, there are some [caveats](https://clojure-goes-fast.com/blog/clojures-deadly-sin/). You can chain multiple lazy operations together, but they create intermediate lazy sequences that can lead to memory bloat and stack overflows if not handled carefully.

Here's a simple example of a lazy sequence chain:

```clojure
(->> (range 1000)  ;; an lazy sequence of numbers starting from 0 to 1000
     (map inc)     ;; intermediate lazy seq
     (map inc)     ;; intermediate lazy seq
     (map inc)     ;; intermediate lazy seq
     (map inc)     ;; intermediate lazy seq
     (filter odd?)  ;; intermediate lazy seq
     (first)      ;; someone is now asking for it
)
;; => 5
```

Before we address the caveats, lazy sequences are built out of what are called **thunks**. These critters are no-arg functions that encapsulate a computation that will be performed later.
They add up in memory until you realize part of the sequence, at which point the thunk is forced, the result is memoized (cached so that it doesn't need to be recomputed), and the chain advances unless the sequence is short-circuited, exhausted or the computation fails. (I hope I got that right!)

Laziness is **chunked**, meaning it steps forward in chunks of 32 items at a time instead of one-by-one. Clojure will usually compute 0 to 31 items right away and cache them, even if you only ever needed item 0.

```clojure
(->> (range 100)
     (map (fn [i]
            (println i " " (System/currentTimeMillis))
            i))
     (first))
```

Lazy sequences shine with **short-circuiting** operations like `some`, `take`, `find` and `first`, which can stop processing early as soon as a result is found.

```clojure
(->> (range)         ;; an infinite lazy sequence of numbers starting from 0
     (map inc)       ;; increment numbers only when someone asks for them
     (filter odd?)    ;; filter odd numbers lazily
     (some #(= % 5)) ;; stops processing as soon as it finds 5
)
```

Using `reduced` with `reduce` can also short-circuit the reduction process.

```clojure
(reduce (fn [_ x]
          (if (even? x)
            (reduced x) ;; short-circuit when we find the first even number
            nil))
        nil
        (->> (repeatedly 10 #(rand-int 100))
             (map inc)
             (filter #(> % (rand-int 100)))))
```

So let's go back to the caveats:

- As we just saw lazy sequences are chunked, so you will have more computational work done than you might expect.
- Side effects happen when the thunk is realized, which can lead to unexpected behavior if you're not careful. In the above snippet, we only expect the first number to be printed, but because of chunking, numbers 0 to 31 are printed in the REPL.
- Running the above snippet multiple times will re-run the side effects, however, if you store the lazy sequence in a var, the side effects will only happen once because the results are cached.
- Lazy sequences can retain references to the head of the sequence until fully realized, which can lead to memory leaks if not handled properly.
- Error handling can be tricky. Errors occur inside the thunk, meaning you need to catch your error inside the lazy operation itself, not outside.

```clojure
(defn bad-function [s]
  (try
    (map
     (fn [v]
       (if (odd? v)
         (throw (ex-info "My custom exception" {:value v}))
         v))
     s)
    (catch Throwable e
      (println "Caught exception:" (.getMessage e)))))

(bad-function (range 10))
;; My custom exception
```

```clojure
(defn good-function [s]
  (map
   (fn [v]
     (try
       (if (odd? v)
         (throw (ex-info "My custom exception" {:value v}))
         v)
       (catch Throwable _ 0.0)))
   s))

(good-function (range 10))
```

| Pros of lazy sequences                | Cons of lazy sequences                 |
|---------------------------------------|----------------------------------------|
| **Efficiency**: Avoids unnecessary work (mostly)   | **Memory retention**: Can retain head until fully realized |
| **Short-circuiting**: Stops early when possible | **Unexpected behavior**: Side effects may not happen when expected |
| **Expressiveness**: Clear and concise transformations | **Debugging difficulty**: Deferred computation can complicate debugging |
| **Composability**: Chain multiple operations | **Memory leaks**: Holding references too long can cause leaks |
|                                       | **Stack overflows**: Deeply nested or long chains can cause stack issues |

## Eager collections

On the flip side of laziness, you have eager collections. These compute everything immediately into a concrete result, like a vector or list.
This is predictable and safe, but can use more memory and upfront work.
Examples of eager operations include `mapv`, `filterv`, `into`, `reduce`, and `set`.

| Pros of eager collections           | Cons of eager collections             |
|------------------------------------|-------------------------------------|
| **Predictability**: Immediate results   | **Memory usage**: Can use more memory upfront |
| **Safety**: Side effects happen immediately | **Inefficiency**: Computes everything even if not needed |
| **Simplicity**: Easier to reason about  | **Lack of short-circuiting**: Cannot stop early |
| **Debuggability**: Easier to debug      | **Less expressiveness**: More boilerplate for complex transformations |
| **No memory leaks**: No deferred references | **Less composability**: Harder to chain multiple operations |
| **No stack overflows**: No deep recursion | **Potential performance hits**: May be slower for large datasets |

## Composability

Sequences are composable, meaning that you can chain many lazy operations together into a lazy pipeline by using sequence functions such as `map`, `filter`, `range`, `take`, and `drop`.
You can convert a lazy sequence into an eager collection by using functions like `vec`, `into`, and `first`. You can realize side effects by using `dorun` or `doall`.

## Transducers

These bad boys are _the_ game changer in Clojure as they give you the best of both worlds. They are reusable, efficient pipelines that do not create intermediate sequences.
Think of them as a recipe for transforming data (like mapping, filtering, or reducing) that can be applied to different contexts (like lazy sequences, vectors, channels, etc.).

Let's take the simple lazy seq version of code below:

```clojure
(->> (range 1000)  ;; an lazy sequence of numbers starting from 0 to 1000
     (map inc)     ;; intermediate seq
     (map inc)     ;; intermediate seq
     (map inc)     ;; intermediate seq
     (map inc)     ;; intermediate seq
     (filter even?) ;; another intermediate
     (take 5))
;; => (4 6 8 10 12)
```

This creates multiple intermediate lazy sequences, which can be inefficient. Now, let's see how we can use transducers to achieve the same result without creating those intermediates:

```clojure
(def xf (comp
          (map inc)
          (map inc)
          (map inc)
          (map inc)
          (filter even?)
          (take 5)))

(transduce xf conj [] (range))
;; => [4 6 8 10 12]

(transduce xf + 0 (range))
;; => 40
```

When a new intermediate sequence is created, it sits in between the input and final result in memory. With transducers, the transformations are applied directly to the input data as it is processed, without creating those intermediates.

Make sure your transducer pipeline is pure (free from side effects) to avoid unexpected behavior.

| Pros of transducers            | Cons of transducers                  |
|-------------------------------|-------------------------------------|
| **Efficiency**: No intermediate collections | **Learning curve**: More complex to understand initially |
| **Reusability**: Can apply the same transformation to different contexts | **Verbosity**: More boilerplate for simple cases |
| **Composability**: Easily combine multiple transformations | **Debugging difficulty**: Harder to debug complex transducer chains |
| **Flexibility**: Works with sequences, vectors, channels, etc. | **Potential performance overhead**: May not always be faster than optimized lazy/eager code |

## Summary

- **Lazy**: builds chains of thunks and creates intermediate seqs. Be explicit about short-circuiting.
- **Eager**: computes everything immediately into a concrete result. Safer with resources but uses more memory.
- **Transducers**: reusable, efficient pipelines that avoid intermediates. Best of both worlds but with a learning curve. Works across collections/streams/channels. Use the for big stream.
- **Side effects**: Keep them idempotent (don't corrupt the state of your application) at run them at the sinks (the start and middle must be pure and evaluation explicit). Because chunking and re-traversal will bite you, don't hide side effects inside functions that return lazy sequences. If you need observability, log where you _commit_ your effects.

A note about `pmap`. This function is a parallel version of `map` that processes items using multiple threads, thus it's not thread safe. Parallel mapping is for pure work only. If you want to to handle side effects concurrently, then use a work queue or `core.async` pipeline with explicit concurrency control.

## References

- [Clojure's deadly sin](https://clojure-goes-fast.com/blog/clojures-deadly-sin/) - Clojure Goes Fast
- [Making Clojure Lazier](https://clojure.org/reference/lazy) - Clojure.org
