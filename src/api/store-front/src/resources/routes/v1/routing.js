import Debug from "debug";
import * as controller from "./controller";
import schema from "./schema";

const debug = Debug("reactstor:store-api:resources");
debug("define routes (routes)");

export default function moduleExportsDefault(fastify, options, next) {
  // e.g. http://localhost:3000/api/v1/routes/slug
  fastify.route({
    method: "GET",
    url: "/routes/:slug",
    schema: {
      params: {
        slug: { type: "string" },
      },
      response: {
        200: schema.routes,
      },
    },
    handler: controller.getOneBySlug,
  });

  next(); // pass control to the next plugin/route
}
