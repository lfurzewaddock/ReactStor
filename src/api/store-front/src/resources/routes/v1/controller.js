import Debug from "debug";
import * as database from "./database";

const debug = Debug("reactstor:store-api:resources");
debug("define control functions (routes)");

// eslint-disable-next-line import/prefer-default-export
export async function getOneBySlug(request) {
  const { slug = "" } = request.params;
  let data = {};
  try {
    data = await database.getOneBySlug(slug);
  } catch (e) {
    debug(`getOneBySlug ctrl error: ${e}`);
    return e;
  }
  // Note: Fastify will only set status code to 204 (no content),
  // if payload is missing/empty, but not for an empty array: (zero results).
  debug(`return ${data.rows.length} row(s)`);
  return data.rows; // note we return the promise without using '.send()'
}
