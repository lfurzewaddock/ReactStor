import { Pool } from "pg";
import Debug from "debug";

const debug = Debug("reactstor:store-api:datasource");
debug("creating database pool");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  max: 20, // set pool max size to 20
  min: 5, // set min pool size to 4
  idleTimeoutMillis: 1000, // close idle clients after 1 sec
  // return an error after 1 sec if conn. could not be established
  // connectionTimeoutMillis: 1000
});

export function query(text, params) {
  return pool.query(text, params);
}

export function end() {
  return pool.end();
}
