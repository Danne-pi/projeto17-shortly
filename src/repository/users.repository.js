import { checkHash } from "../database/salted.js";
import { connection } from "../database/db.js";
import RepositoryResponse from "./response.js";


export async function createUser(_user){
    const resp = new RepositoryResponse
    const {name, email, password} = _user

    try {
        await connection.query(`
            INSERT INTO users (name, email, password) 
            VALUES ($1, $2, $3)`, 
            [name, email, password])

        return resp.continue()

    } catch(err){return resp.direct(500, err.message)}
}


///////////////////////////////////////////////////////


export async function loginUser(_session){
    const resp = new RepositoryResponse
    const {token, userId, createdAt} = _session

    try {
        await connection.query(`
            INSERT INTO sessions (token, userId, createdAt) 
            VALUES ($1, $2, $3)`, 
            [token, userId, createdAt])

        return resp.continue() 

    } catch(err){return resp.direct(500, err.message)}
}


///////////////////////////////////////////////////////


export async function getUser(_id){
    const resp = new RepositoryResponse

    try {
        const user = await connection.query(`
            SELECT
            name,
            links.id as urlId,
            shortUrl,
            url,
            views

            FROM users LEFT JOIN links
            ON
            links.userId = $1
            WHERE users.id = $1
            `, 
            [_id])

            let shortenedUrls = {}
            let visitCount = 0

            if(user.rows[0].urlId){
              shortenedUrls = user.rows.map(item => {
              visitCount += Number(item.views)
              return {
                id: item.urlId,
                shortUrl: item.shortUrl,
                url: item.url,
                visitCount: Number(item.views),}})
            } 

            const final = {
            id: _id,
            name: user.rows[0].name,
            visitCount,
            shortenedUrls,}


        resp.info = final
        return resp.continue() 

    } catch(err){return resp.direct(500, err.message)}
}


//////////////////////////////////////////////////////


export async function checkUserAlreadyExists(_name, _email){
    const resp = new RepositoryResponse
    let message = ""
    
    try {
        const query = await connection.query(`
        SELECT name, email FROM users 
        WHERE LOWER(name) = LOWER($1)
        OR
        LOWER(email) = LOWER($2)`,
        [_name, _email])

        query.rows.map(item => {
            const { name, email } = item
            if(name.toLowerCase() === _name.toLowerCase()){
            message += "This username is already in use\n"}
            if(email.toLowerCase() === _email.toLowerCase()){
            message += "This email is already in use\n"}
        })

        resp.condition = query.rowCount > 0
        resp.errCode = 409
        resp.errMessage = message
        return resp.byCondition()

    } catch(err){return resp.direct(500, err.message)}
}


export async function checkUser(_user){
    const resp = new RepositoryResponse
    const {email:_email, password:_password} = _user
    
    try {
        const query = await connection.query(`
        SELECT id, password FROM users 
        WHERE LOWER(email) = LOWER($1)`,
        [_email])

        {resp.condition = !query.rowCount > 0
        resp.errCode = 401
        resp.errMessage = "This account doesn't exist"
        const { code, message } = resp.byCondition()
        if(code){return resp.direct(code, message)}}

        const {password:hash, id} = query.rows[0]
        const { code, message } = await checkHash(_password, hash)
        if(code){return resp.direct(code, message)}

        resp.info = {id}
        return resp.continue()

    } catch(err){return resp.direct(500, err.message)}
}

export async function getRank(limit){
    const resp = new RepositoryResponse
    
    try {
        const query = await connection.query(`
        SELECT * FROM view_ranking
        LIMIT $1`,
        [limit])

        return resp.direct(200, query.rows)

    } catch(err){return resp.direct(500, err.message)}
}