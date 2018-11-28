import Debug from "debug";
import controller from "./healthcheck.controller";

const debug = Debug("reactstor:store-api:resources");
debug("define routes (healthcheck)");

export default(fastify, opts, next) => {
  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      response: {
        200: {
          type: "object",
          properties: {
            status: {
              type: "string",
            },
          },
        },
      },
    },
    handler: controller,
  });

  next(); // pass control to the next plugin/route
};
