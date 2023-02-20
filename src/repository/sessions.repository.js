import { connection } from "../database/db.js";
import RepositoryResponse from "./response.js";

export async function validateToken(token){
    const resp = new RepositoryResponse

    try{
        const session = await connection.query(`SELECT * FROM sessions WHERE token=$1`, [token])
        
        if(session.rowCount === 0){return resp.direct(404, "This session doesn't exist")}
        
        resp.info = {user_id: session.rows[0].user_id}
        return resp.continue()

    } catch(err){return resp.direct(500, err.message)}
};