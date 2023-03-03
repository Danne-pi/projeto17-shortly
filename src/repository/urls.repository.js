import { connection } from "../database/db.js"
import RepositoryResponse from "./response.js"

export async function createUrl(_body){
    const resp = new RepositoryResponse
    const {url, shortUrl, userId} = _body

    try {
        const id = await connection.query(`
        INSERT INTO
          links (url, "shortUrl", "userId")
        VALUES
          ($1, $2, $3) RETURNING id`, 
        [url, shortUrl, userId])

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


export async function accessUrl(shortUrl){
    const resp = new RepositoryResponse

    try {
        const links = await connection.query(`
          UPDATE links
          SET views = views + 1
          WHERE "shortUrl" = $1
          RETURNING url`,
          [shortUrl]
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
    const user = customQuery ? `"${customQuery}"` : `id, "shortUrl", url` 

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