import { connection } from "../database/db.js";
import response from "./response.js";



export async function createUser(_user){
    const resp = new response
    const {name, email, password} = _user

    try {
        await connection.query(`
            INSERT INTO users (
              name, 
              email, 
              password) 
            VALUES ($1, $2, $3)`, 
            [name, email, password])

        return resp.direct(201, null) 

    } catch(err){return resp.direct(500, err.message)}
}


//////////////////////////////////////////////////////


export async function checkUserAlreadyExists(_name, _email){
    const resp = new response
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
            if(name.toLowerCase() === _name){
            message += "This username is already in use\n"}
            if(email.toLowerCase() === _email){
            message += "This email is already in use\n"}
        })

        resp.condition = query.rowCount > 0
        resp.errCode = 409
        resp.errMessage = message
        return resp.byCondition()

    } catch(err){return resp.direct(500, err.message)}
}