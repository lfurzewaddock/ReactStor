import Debug from "debug";
import * as controller from "./controller";
import schema from "./schema";

const debug = Debug("reactstor:store-api:resources");
debug("define routes (products)");

export default function moduleExportsDefault(fastify, options, next) {
  // e.g. http://localhost:3000/api/v1/products/1
  fastify.route({
    method: "GET",
    url: "/products/:id",
    schema: {
      params: {
        id: { type: "integer" },
      },
      response: {
        200: schema.products,
      },
    },
    handler: controller.getOneById,
  });

  next(); // pass control to the next plugin/route
}
