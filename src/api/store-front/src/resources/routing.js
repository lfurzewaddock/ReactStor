import Debug from "debug";
import users from "./users/v1/routing";
import categories from "./categories/v1/routing";
import products from "./products/v1/routing";
import payments from "./payments/v1/routing";
import healthcheck from "./healthcheck.routing";

const debug = Debug("reactstor:store-api:resources");
debug("configure routes (all)");

export default function () {
  return [
    {
      routes: healthcheck,
    },
    {
      prefix: "/v1",
      routes: users,
    },
    {
      prefix: "/v1",
      routes: categories,
    },
    {
      prefix: "/v1",
      routes: products,
    },
    {
      prefix: "/v1",
      routes: payments,
    },
  ];
}
