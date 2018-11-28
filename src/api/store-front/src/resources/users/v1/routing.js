import Debug from "debug";
import * as controller from "./controller";
import schema from "./schema";

const debug = Debug("reactstor:store-api:resources");
debug("define routes (users)");

export default function moduleExportsDefault(fastify, options, next) {
  fastify.route({
    method: "POST",
    url: "/users",
    schema: {
      body: schema.newUser,
    },
    handler: controller.registerUser,
  });

  next(); // pass control to the next plugin/route
}
