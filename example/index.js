const streamingRender = require('../lib');
const {renderToNodeStream} = require('react-dom/server');
const React = require('react');
const Koa = require('koa');
const app = new Koa();

const IndexPage = require('./pages');

// response
app.use(ctx => {
  const component = <IndexPage toWhat="developer"/>
  const stream = renderToNodeStream(component);
  return streamingRender(
    ctx,
    '<html><head></head><body>', // head of document
    stream, // streaming body of document
    '</body></html>', // document tail
    {
      onStats: (stats) => {
        console.log('stats:', stats);
      }
    }
  );
});

app.listen(3000);
console.log('Listening at 3000');