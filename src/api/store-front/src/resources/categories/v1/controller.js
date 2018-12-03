import Debug from "debug";
import { isEmpty } from "ramda";
import * as database from "./database";

const debug = Debug("reactstor:store-api:resources");
debug("define control functions (categories)");

export async function getOneById(request) {
  const { id = 0 } = request.params;
  let data = {};
  try {
    data = await database.getOneById(id);
  } catch (e) {
    debug(`getManyByLevelAndAncestors ctrl error: ${e}`);
    return e;
  }
  // Note: Fastify will only set status code to 204 (no content),
  // if payload is missing/empty, but not for an empty array: (zero results).
  debug(`return ${data.rows.length} row(s)`);
  return data.rows; // note we return the promise without using '.send()'
}

export async function getManyByRouteId(request) {
  const { id = 0 } = request.params;
  let data = {};
  try {
    data = await database.getOneByRouteId(id);
  } catch (e) {
    debug(`getOneByRouteId ctrl error: ${e}`);
    return e;
  }

  const { nlevel, path } = data.rows[0];
  try {
    data = await database.getManyFilterByLevelAndAncestors(
      nlevel + 1, prepareAncestorsPath(path),
    );
  } catch (e) {
    debug(`getManyByLevelAndAncestors ctrl error: ${e}`);
    return e;
  }

  // Note: Fastify will only set status code to 204 (no content),
  // if payload is missing/empty, but not for an empty array: (zero results).
  debug(`return ${data.rows.length} row(s)`);
  return data.rows; // note we return the promise without using '.send()'
}

export async function getManyFilterByLevelAndAncestors(request) {
  let data = {};
  if (!isEmpty(request.query)) {
    const { level = 0, ancestors } = request.query;
    try {
      data = await database.getManyFilterByLevelAndAncestors(
        level, prepareAncestorsPath(ancestors),
      );
    } catch (e) {
      debug(`getManyFilterByLevelAndAncestors ctrl error: ${e}`);
      return e;
    }
  } else {
    try {
      data = await database.getMany();
    } catch (e) {
      debug(`getManyFilterByLevelAndAncestors ctrl error: ${e}`);
      return e;
    }
  }
  // Note: Fastify will only set status code to 204 (no content),
  // if payload is missing/empty, but not for an empty array: (zero results).
  debug(`return ${data.rows.length} row(s)`);
  return data.rows; // note we return the promise without using '.send()'
}

function prepareAncestorsPath(ancestors = "") {
  if (ancestors !== null && ancestors.length > 0) {
    return `*.${ancestors}.*`;
  }
  return "*";
}
