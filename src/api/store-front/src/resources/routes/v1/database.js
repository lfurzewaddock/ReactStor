import Debug from "debug";
import sql from "pg-sql2-fp";
import * as db from "../../../datasource";

const debug = Debug("reactstor:store-api:resources");
debug("define DB calls (routes)");

// eslint-disable-next-line import/prefer-default-export
export async function getOneBySlug(slug) {
  debug("executing SQL query (getOneBySlug)");
  const { text, values } = sql.compile(sql`SELECT id, runtime, subject, matter FROM route WHERE slug = ${sql.value(slug)}`);
  debug(`SQL query: ${JSON.stringify(text)}`);
  debug(`SQL value(s): ${JSON.stringify(values)}`);
  try {
    const result = await db.query(text, values);
    return result;
  } catch (e) {
    debug(`getOneBySlug db error: ${e}`);
    return Promise.reject(e);
  }
}
