# Koa2 react 16+ streaming render helper

Very tiny, zero dependencies

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
    ctx,
    '<html><head></head><body>', // head of document
    stream, // streaming body of document
    '</body></html>' // document tail
  );
});
```

# Examples

see under "examples" directory

# Test

```
npm install
npm test
```

# Faq

## What will happen if an error occurs through react rendering process? How do I handle that?

Don't worry, you are covered. If an error occurs while render, it will follow standard koa2 error handling middleware