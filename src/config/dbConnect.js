const { Pool } = require("pg")
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, DB_MAX_CONNECT, DB_IDLETIMEOUT, DB_CONNECTIONTIMEOUT, DATABASE_URL,  } = require("./envs")

const dbConnectionLocal = {
  host:                    DB_HOST,
  port:                    DB_PORT,
  database:                DB_NAME,
  user:                    DB_USER,
  password:                DB_PASSWORD,
  max:                     DB_MAX_CONNECT,
  idleTimeoutMillis:       DB_IDLETIMEOUT,
  connectionTimeoutMillis: DB_CONNECTIONTIMEOUT
}

const dbConnectionProduction = {
  connectionString: DATABASE_URL
}

const pool = new Pool(  DATABASE_URL ? dbConnectionProduction  : dbConnectionLocal   )

module.exports = {
  pool
}

