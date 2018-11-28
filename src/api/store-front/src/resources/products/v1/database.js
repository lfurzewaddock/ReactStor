import Debug from "debug";
import sql from "pg-sql2-fp";
import * as db from "../../../datasource";

const debug = Debug("reactstor:store-api:resources");
debug("define DB calls (products)");

// eslint-disable-next-line import/prefer-default-export
export async function getOneById(id) {
  debug("executing SQL query (getOneById)");
  const { text, values } = sql.compile(sql`select name, code from product where id = ${sql.value(id)}`);
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
