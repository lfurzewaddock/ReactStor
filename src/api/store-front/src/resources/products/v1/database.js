import Debug from "debug";
import sql from "pg-sql2-fp";
import * as db from "../../../datasource";

const debug = Debug("reactstor:store-api:resources");
debug("define DB calls (products)");

export async function getOneById(id) {
  debug("executing SQL query (getOneById)");
  const { text, values } = sql.compile(sql`SELECT id, title, code FROM product WHERE id = ${sql.value(id)}`);
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

export async function getOneByRouteId(id) {
  debug("executing SQL query (getOneByRouteId)");
  const { text, values } = sql.compile(sql`
    SELECT product.id, product.title, product.code FROM product
    INNER JOIN route ON product.route_id = route.id
    WHERE product.route_id = ${sql.value(id)}
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
