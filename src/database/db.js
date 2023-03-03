import pg from 'pg';
import dotenv from "dotenv";

dotenv.config();

pg.types.setTypeParser(20, function(val) {
    return parseInt(val)
})
pg.types.setTypeParser(1700, function(val) {
    return parseFloat(val)
})

const {Pool} = pg;

export const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});
