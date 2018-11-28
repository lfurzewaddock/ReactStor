import Debug from "debug";

const debug = Debug("reactstor:store-api:helpers");

export default function route(app, routers, prefix = "") {
  routers.forEach((router) => {
    if (router.routes instanceof Function) {
      debug("registering route(s) using function");
      app.register(router.routes, { prefix: `${prefix || ""}${router.prefix || ""}` });
    } else if (router.routes instanceof Array) {
      debug("Array received - call this fn again recursively");
      return route(app, router.routes, router.prefix);
    }
    // router.routes is not a function/array
    // TODO should fail hard - throw error?
    return null;
  });
}
