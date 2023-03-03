import { createUser, getRank, getUser, loginUser } from "../repository/users.repository.js";
import { hashPass } from "../database/salted.js";
import { v4 as uuidv4 } from 'uuid';

export async function create(req, res){
    let user = req.body

    {const { code, message, info } = await hashPass(user)
    if(code){return res.status(code).send(message)}
    else{user = info}}

    {const { code, message } = await createUser(user)
    if(code){return res.status(code).send(message)}}

    return res.sendStatus(201)
}

export async function login(req, res){
    const session = {
    token: uuidv4(),
    user_id: res.locals.id,
    created_at: Date.now(),}

    {const { code, message } = await loginUser(session)
    if(code){return res.status(code).send(message)}}

    return res.status(200).send({token: session.token})
}

export async function profile(req, res){
    const { userId } = res.locals

    const { code, message, info } = await getUser(userId)
    if(code){return res.status(code).send(message)}

    return res.status(200).send(info)
}

export async function rank(req, res){
    const { limit = 10 } = req.params

    const { code, message} = await getRank(limit)
    if(code){return res.status(code).send(message)}

    return res.status(code).send(message)
}