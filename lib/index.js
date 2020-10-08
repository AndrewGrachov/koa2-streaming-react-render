module.exports = async function renderStream(ctx, head, stream, tail, options={}) {

  if (!head) {
    throw new Error('Invalid parameter - head is required, e.g. <html><head></head><body>')
  }

  if (!stream) {
    throw new Error('Invalid parameter - react render stream is required');
  }

  if (!tail) {
    throw new Error('Invalid parameter - tail is required, e.g. </body></html>');
  }

  const err = await new Promise((resolve) => {
    /*
      Exclusive handling. If stream returns uncaught from the beginning(which can be with react),
      we should follow classic koa flow with error handling middleware.
      if not, bypass koa respond, and write directly to response
    */
    stream.on('error', (streamError) => {
      resolve(streamError);
    });

    // react ssr stream won't be readable if error occurs
    stream.once('readable', () => {
      // very important! bypass koa response
      ctx.respond = false;
      // without explicitly setting status, will be 404
      ctx.res.writeHead(200, {'Content-Type': options.contentType || 'text/html;charset=UTF-8'});
      ctx.res.write(head);
      stream.pipe(ctx.res, {end: false});
      stream.on('end', () => {
        ctx.res.write(tail);
        ctx.res.end();
      });
      resolve();
    });
  });

  if (err) {
    throw err;
  }
}
