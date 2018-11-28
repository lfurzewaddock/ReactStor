"use strict";

const fp = require("fastify-plugin");

function plainTextBodyPlugin(fastify, options, next) {
  const opts = Object.assign({}, options || {});

  function contentParser(req, body, done) {
    try {
      done(null, body);
    } catch (err) {
      err.statusCode = 400;
      done(err, undefined);
    }
  }

  fastify.addContentTypeParser(
    "text/plain",
    { parseAs: "string", bodyLimit: opts.bodyLimit },
    contentParser,
  );
  next();
}

module.exports = fp(plainTextBodyPlugin, {
  fastify: "^1.0.0",
  name: "fastify-plainTextBody",
});
