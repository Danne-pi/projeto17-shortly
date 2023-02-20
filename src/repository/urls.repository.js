import { connection } from "../database/db.js"
import RepositoryResponse from "./response.js"

export async function createUrl(_body){
    const resp = new RepositoryResponse
    const {url, short_url, user_id} = _body

    try {
        const id = await connection.query(`
        INSERT INTO
          links (url, short_url, user_id)
        VALUES
          ($1, $2, $3) RETURNING id`, 
        [url, short_url, user_id])

        resp.info = id.rows[0]
        return resp.continue() 

    } catch(err){return resp.direct(500, err.message)}
}


////////////////////////////////////////////////////////


export async function deleteUrl(_id){
    const resp = new RepositoryResponse

    try {
        await connection.query(`
        DELETE FROM links WHERE id = $1`, 
        [_id])

        return resp.continue() 

    } catch(err){return resp.direct(500, err.message)}
}


////////////////////////////////////////////////////////


export async function accessUrl(short_url){
    const resp = new RepositoryResponse

    try {
        const links = await connection.query(`
          UPDATE links
          SET views = views + 1
          WHERE short_url = $1
          RETURNING url`,
          [short_url]
        );
        
        resp.condition = links.rowCount === 0
        resp.errCode = 404
        resp.errMessage = "This link doesn't exists"
        resp.info = links.rows[0]
        return resp.byCondition();
  
    } catch(err){return resp.direct(500, err.message)}
}


////////////////////////////////////////////////////////


export async function getUrl(_id, customQuery){
    const resp = new RepositoryResponse
    const user = customQuery || "id, short_url, url" 

    try {
        const links = await connection.query(`
          SELECT ${user} FROM links
          WHERE id = $1`,
          [_id]
        );
        
        resp.condition = links.rowCount === 0
        resp.errCode = 404
        resp.errMessage = "This link doesn't exists"
        resp.info = links.rows[0]
        return resp.byCondition();
  
    } catch(err){return resp.direct(500, err.message)}
}