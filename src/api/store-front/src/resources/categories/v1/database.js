import Debug from "debug";
import sql from "pg-sql2-fp";
import * as db from "../../../datasource";

const debug = Debug("reactstor:store-api:resources");
debug("define DB calls (categories)");

export async function getMany() {
  debug("executing SQL query (getMany)");
  const { text, values } = sql.compile(sql`SELECT id, nlevel(path), path, heading, body FROM category`);
  debug(`SQL query: ${JSON.stringify(text)}`);
  debug(`SQL value(s): ${JSON.stringify(values)}`);
  try {
    const result = await db.query(text, values);
    return result;
  } catch (e) {
    debug(`getMany db error: ${e}`);
    return Promise.reject(e);
  }
}

export async function getOneById(id) {
  debug("executing SQL query (getOneById)");
  const { text, values } = sql.compile(sql`SELECT id, nlevel(path), path, heading, body FROM category WHERE id = ${sql.value(id)}`);
  debug(`SQL query: ${JSON.stringify(text)}`);
  debug(`SQL value(s): ${JSON.stringify(values)}`);
  try {
    const result = await db.query(text, values);
    return result;
  } catch (e) {
    debug(`getOneById db error: ${e}`);
    return Promise.reject(e);
  }
}

export async function getManyFilterByLevelAndAncestors(level, ancestors) {
  debug("executing SQL query (getManyFilterByLevelAndAncestors)");
  const { text, values } = sql.compile(
    sql`SELECT id, nlevel(path), path, heading, body FROM category WHERE nlevel(path) = ${sql.value(level)} AND path ~ ${sql.value(ancestors)}`,
  );
  debug(`SQL query: ${JSON.stringify(text)}`);
  debug(`SQL value(s): ${JSON.stringify(values)}`);
  try {
    const result = await db.query(text, values);
    return result;
  } catch (e) {
    debug(`getManyFilterByLevelAndAncestors db error: ${e}`);
    return Promise.reject(e);
  }
}

export async function getOneByRouteId(id) {
  debug("executing SQL query (getOneByRouteId)");
  const { text, values } = sql.compile(sql`
    SELECT category.id, nlevel(path), path, heading, body FROM category
    INNER JOIN route ON category.route_id = route.id
    WHERE category.route_id = ${sql.value(id)}
  `);
  debug(`SQL query: ${JSON.stringify(text)}`);
  debug(`SQL value(s): ${JSON.stringify(values)}`);
  try {
    const result = await db.query(text, values);
    return result;
  } catch (e) {
    debug(`getOneByRouteId db error: ${e}`);
    return Promise.reject(e);
  }
}
