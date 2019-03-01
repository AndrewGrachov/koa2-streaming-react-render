# Koa2 react 16+ streaming render helper


# Why ?

Because React server side streaming render can be tricky with koa2.

# Install

```
npm i --save koa2-streaming-react-render
```

# Use

```
const {renderToNodeStream} = require('react-dom/server');
const render = require('koa2-streaming-react-render');

koa.use(async (ctx) => {
  const component = ...;
  const stream = renderToNodeStream(yourComponent);

  return render(
    '<html><head></head><body>', // head of document
    stream, // streaming body of document
    '</body></html>' // document tail
  );
});
```

# Examples

see (here)