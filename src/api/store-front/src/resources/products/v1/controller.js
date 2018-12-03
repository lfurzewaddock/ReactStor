import Debug from "debug";
import * as database from "./database";

const debug = Debug("reactstor:store-api:resources");
debug("define control functions (products)");

export async function getOneById(request) {
  const { id = 0 } = request.params;
  let data = {};
  try {
    data = await database.getOneById(id);
  } catch (e) {
    debug(`getOneById ctrl error: ${e}`);
    return e;
  }
  // Note: Fastify will only set status code to 204 (no content),
  // if payload is missing/empty, but not for an empty array: (zero results).
  debug(`return ${data.rows.length} row(s)`);
  return data.rows; // note we return the promise without using '.send()'
}

export async function getOneByRouteId(request) {
  const { id = 0 } = request.params;
  let data = {};
  try {
    data = await database.getOneByRouteId(id);
  } catch (e) {
    debug(`getOneByRouteId ctrl error: ${e}`);
    return e;
  }
  // Note: Fastify will only set status code to 204 (no content),
  // if payload is missing/empty, but not for an empty array: (zero results).
  debug(`return ${data.rows.length} row(s)`);
  return data.rows; // note we return the promise without using '.send()'
}
