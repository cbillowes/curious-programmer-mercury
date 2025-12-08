---
title: Use React hooks inside an MDX story in Storybook
date: 2022-01-13
cover: storybook.png
creditSource: storybook.js.org
creditLink: https://storybook.js.org/
devTo: https://dev.to/cbillowes/use-react-hooks-inside-an-mdx-story-in-storybook-33pl
tags:
  - Technical
  - Tip
  - Storybook
  - React
  - JavaScript
abstract: >
  Do you need to use a React hook inside Storybook?
  Here's a quick snippet to show you how to do so.
---

```javascript
<Story name="With hooks">
  {() => {
    const [count, setCount] = useState(0);
    return (
      <button onClick={() => setCount(count + 1)}>
        Clicked {count} time(s)
      </button>
    );
  }}
</Story>
```
