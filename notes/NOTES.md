- Routing Files:

layout
page
loading
not-found
error
global-error
route -> API endpoint
template -> re-rendered layout
default -> fallback page

- Top Next.js mistakes:

1. When we create a route handler and we use that request in a server component,
   we don't need to use fetch API or axios to make a request to the server, because
   both the request and the component are running on the server. We can just call the function directly.
2. params & searchParams props are only available at `page.tsx` files, and not for every component file
3. `redirect` needs to be outside of try/catch blocks

- 12 common mistakes in React:

1. State updates aren't immediate
2. Conditional rendering
3. Updating object state
4. 1 Object state instead of multiple smaller ones
5. Information can be derived from state / props
6. Primitives vs non-primitives
7. Initializing state with object
8. TypeScript mistakes
9. Not using custom hooks
10. Server & Client components
11. Stale closure
12. Fetching in useEffect

Number 11 example:

```tsx
import { useEffect, useState } from "react";

export default function Example() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);

  // or
  //   useEffect(() => {
  //     setInterval(() => {
  //       setCount((prevCount) => prevCount + 1);
  //     }, 1000);
  //   }, []);

  return <div>{count}</div>;
}
```

- What is a closure in JavaScript?

A closure in JavaScript is a function that has access to its own scope, the outer function's scope, and the global scope. It's created every time a function is created, at function creation time.
The closure has three scope chains: 1. It has access to its own scope—variables defined between its curly brackets. 2. It has access to the outer function’s variables and parameters. 3. It has access to the global variables.
Here's a simple example of a closure:

```js
function outerFunc(outerVar) {
  return function innerFunc(innerVar) {
    console.log("outerVar:", outerVar);
    console.log("innerVar:", innerVar);
  };
}

const newFunc = outerFunc("outside");
newFunc("inside"); // logs: outerVar: outside, innerVar: inside
```

In the above example, ﻿outerFunc defines a variable ﻿outerVar and a function ﻿innerFunc. ﻿innerFunc is the closure that is returned from ﻿outerFunc and it has access to ﻿outerVar as a result. When we call ﻿newFunc, we are actually calling the ﻿innerFunc that was returned when we ran ﻿outerFunc. And because ﻿innerFunc is a closure, it has access to ﻿outerVar.
