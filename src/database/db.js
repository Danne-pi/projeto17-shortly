import pg from 'pg';
import dotenv from "dotenv";

dotenv.config();
const {Pool} = pg;

// pg.types.setTypeParser(20, function(val) {
//     return parseInt(val)
// })
// pg.types.setTypeParser(1700, function(val) {
//     return parseFloat(val)
// })


export const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// sudo su -c "pg_dump <nome-da-sua-database> --inserts --no-owner" postgres > dump.sql