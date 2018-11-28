import Debug from "debug";
import * as controller from "./controller";
import schema from "./schema";

const debug = Debug("reactstor:store-api:resources");
debug("define routes (categories)");

export default function moduleExportsDefault(fastify, options, next) {
  // e.g. http://localhost:3000/api/v1/categories?level=2&ancestors=aat.accounting
  // e.g. http://localhost:3000/api/v1/categories?level=2&ancestors=*.accounting
  // e.g. http://localhost:3000/api/v1/categories?level=3&ancestors=*.bookkeeping
  fastify.route({
    method: "GET",
    url: "/categories",
    schema: {
      querystring: {
        level: { type: "integer" },
        ancestors: { type: "string" },
      },
      response: {
        200: schema.categories,
      },
    },
    handler: controller.getManyFilterByLevelAndAncestors,
  });
  // e.g. http://localhost:3000/api/v1/categories/1
  fastify.route({
    method: "GET",
    url: "/categories/:id",
    schema: {
      params: {
        id: { type: "integer" },
      },
      response: {
        200: schema.categories,
      },
    },
    handler: controller.getOneById,
  });

  next(); // pass control to the next plugin/route
}
