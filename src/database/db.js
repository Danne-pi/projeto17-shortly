// import pg from 'pg';
// import dotenv from "dotenv";

// dotenv.config();

// pg.types.setTypeParser(20, function(val) {
//     return parseInt(val)
// })
// pg.types.setTypeParser(1700, function(val) {
//     return parseFloat(val)
// })

// const {Pool} = pg;

// export const connection = new Pool({
//     connectionString: process.env.DATABASE_URL,
// });

// sudo su -c "pg_dump <nome-da-sua-database> --inserts --no-owner" postgres > dump.sql

import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const configDatabase = {
  connectionString: process.env.DATABASE_URL,
  ...(process.env.NODE_ENV === "production" && {
    ssl: {
      rejectUnauthorized: false,
    },
  }),
};

const db = new Pool(configDatabase);


export default db;