import Debug from "debug";

const debug = Debug("reactstor:store-api:resources");

export default (request, reply) => {
  debug("executing resources API health check");
  reply.code(200).send({ status: "ok" });
};
