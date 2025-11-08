---
title: "Reading files in Clojure"
cover: clojure-files.webp
date: 2025-08-31 00:00:01
tags:
- Clojure
- Data
- I/O
creditSource: ChatGPT-4o
creditLink: https://chatgpt.com/
---

Here's a tour of file reading options in Clojure, from reading tiny files to rather large datasets.

## Small, simple files

### Whole file in memory

`slurp` is a one liner that is dead simple and even handles URLs! It let's you enable encoding but loads the whole thing into memory so it's probably best not to try this with large data.
Slurp is useful for small files like configs or JSON/edn files.

```clojure
(slurp "path/to/file.txt" :encoding "UTF-8") ;; by default encoding is is "UTF-8"
```

### Buffered & manual control

`clojure.java.io/reader` and `with-open` provides efficient, buffered I/O that you control how much is read. It's a bit more boilerplate but you can read line by line or in chunks.

This is great for log files or any text file where you want to process line by line without loading the whole file.

Line by line:

```clojure
(require '[clojure.java.io :as io])
(with-open [r (io/reader "data/hello.txt")]
  (println (.readLine r)))
```

Read in chunks:

```clojure
(with-open [r (io/reader "data/bigfile.txt")]
  (let [buf (char-array 1024)] ; 1KB buffer
    (loop [n (.read r buf)]
      (when (pos? n)
        (println (String. buf 0 n)) ; process chunk
        (recur (.read r buf))))))
```

## Line-oriented text

### Lazy lines for Reader

`line-seq` creates a lazy sequence of lines from a reader. This is memory efficient and allows you to process large files line by line. Note that the reader must stay open while consuming the file.

```clojure
(with-open [r (io/reader "data/big.log")]
  (doseq [line (line-seq r)] ; consume inside with-open
    (when (re-find #"ERROR" line)
      (println line))))
```

This is perfect for large text files where you want to process each line without loading the entire file into memory.

### Safer pattern with transducers

To avoid the reader being closed while consuming, you can use `transduce` with `line-seq`. This way, the reader is only open during the transduction process.

```clojure
(with-open [r (io/reader "data/big.log")]
  (transduce
    (comp (map identity)
          (filter #(re-find #"ERROR" %)))
    (completing (fn [cnt _] (inc cnt)))
    0
    (line-seq r)))
```

### Java NIO lines

Java NIO's `Files/lines` method returns a stream of lines from a file, which can be processed lazily and efficiently. You need to convert the Java iterator to a Clojure sequence using `iterator-seq`.

```clojure
(import '(java.nio.file Files Paths)
        '(java.nio.charset StandardCharsets))

(with-open [s (Files/lines (Paths/get "data/big.log" (make-array String 0))
                           StandardCharsets/UTF_8)]
  (->> (.iterator s) iterator-seq
       (filter #(re-find #"ERROR" %))
       (take 10)
       doall))
```

## Structured formats

### EDN

Native Clojure data and safe reader. Puts whole forms in data unless you stream from form to form.

```clojure
(require '[clojure.edn :as edn] '[clojure.java.io :as io])

; single EDN form
(with-open [r (io/reader "data/config.edn")]
  (edn/read {:eof ::eof} r))

; one EDN form per line (streaming)
(with-open [r (io/reader "data/events.edn")]
  (into []
        (comp (map edn/read-string) (filter :ok?))
        (line-seq r)))
```

### CSV

For CSV, use a library like `clojure.data.csv` to read and parse CSV files efficiently.

```clojure
(require '[clojure.data.csv :as csv] '[clojure.java.io :as io])
(with-open [r (io/reader "data/data.csv")]
  (doall
    (csv/read-csv r)))
```

### JSON

For JSON, use a library like `cheshire` to parse JSON files.
It's very fast, flexible, and supports streaming via `parse-stream`.

```clojure
(require '[cheshire.core :as json])

; whole doc (OK for small/medium JSON)
(with-open [r (io/reader "data/small.json")]
  (json/parse-stream r true))

; NDJSON: one JSON object per line (great for huge files)
(with-open [r (io/reader "data/events.ndjson")]
  (transduce
    (comp (map json/parse-string)      ; line -> map
          (filter #(= "WARN" (:level %))))
    (completing (fn [cnt _] (inc cnt)))
    0
    (line-seq r)))
```

## Conclusion

Clojure provides a variety of tools for reading files, from simple one-liners for small files to more complex patterns for large datasets. Choose the right tool based on your file size, format, and processing needs to write efficient and maintainable code.
