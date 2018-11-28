import fastify from "fastify";
import formBody from "fastify-formbody";
import cors from "fastify-cors";
import Debug from "debug";
import router from "./helpers/router";
import routes from "./resources/routing";

import plainTextBodyParser from "./parsers/plain-text-body";

const debug = Debug("reactstor:store-api");
// /* The node global process has an unhandledRejection event,
// for unhandled promise (native only) rejection. */
// // Source: http://thecodebarbarian.com/unhandled-promise-rejections-in-node.js.html
// process.on("unhandledRejection", (error) => {
//   debug(`reactstor:store-api:app:unhandled rejection: ${error.message}`);
// });

export default function appStart(port, host) {
  debug("bootstrap app");
  return new Promise(function appPromise(resolve, reject) {
    const app = fastify({
      logger: {
        level:
          process.env.API_LOG_LEVEL || (process.env.NODE_ENV === "production" ? "error" : "info"),
      },
      // ignoreTrailingSlash: true,
    });

    const networkPort = port || process.env.API_PORT || 3000;
    const hostAddress = host || process.env.API_HOST || "127.0.0.1";

    app.register(formBody);
    app.register(plainTextBodyParser);
    app.register(cors, {
      origin: process.env.NODE_ENV === "production" ? `${process.env.CORS_ORIGIN_PRODUCTION}` : `${process.env.CORS_ORIGIN_DEVELOPMENT}`,
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "text/plain"],
      credentials: true,
      optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    router(app, routes(), "/api");

    app.listen(networkPort, hostAddress, function appListen(error) {
      if (error) {
        debug(`rejected: ${error.message}`);
        reject(error);
      } else {
        debug("completed!");
        resolve(app);
      }
    });

    // Registers an event listener that will be removed after its first call.
    app.server.once("error", reject);
  });
}
