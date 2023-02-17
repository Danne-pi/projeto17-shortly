import { createUser } from "../repository/users.repository.js";


export async function create(req, res){
    const { code, message } = await createUser(req.body)
    res.status(code).send(message)
}