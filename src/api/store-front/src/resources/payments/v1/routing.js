import Debug from "debug";
import * as controller from "./controller";

const debug = Debug("reactstor:store-api:resources");
debug("define routes (payments)");

export default function moduleExportsDefault(fastify, options, next) {
  fastify.route({
    method: "POST",
    url: "/payments",
    handler: controller.transaction,
  });

  next(); // pass control to the next plugin/route
}
