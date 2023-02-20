import { nanoid } from "nanoid"
import { accessUrl, createUrl, deleteUrl, getUrl } from "../repository/urls.repository.js"


export async function create(req, res){
    const body ={
    url: req.body.url,
    short_url: nanoid(),
    user_id: res.locals.user_id,}

    const { code, message, info } = await createUrl(body)
    if(code){return res.status(code).send(message)}

    const send = {
    id: info.id,
    short_url: body.short_url,} 

    return res.status(201).send(send)
}


//////////////////////////////////////////////////////////


export async function access(req, res) {
    const { shortUrl } = req.params;
    
    const { code, message, info } = await accessUrl(shortUrl)
    if(code){return res.status(code).send(message)}

    return res.redirect(info.url)
}


//////////////////////////////////////////////////////////


export async function getUrlInfo(req, res) {
    const { id } = res.locals;
    
    const { code, message, info } = await getUrl(id)
    if(code){return res.status(code).send(message)}

    return res.status(200).send(info)
}


//////////////////////////////////////////////////////////


export async function remove(req, res) {
    const { id, user_id } = res.locals;
    
    {const { code, message, info } = await getUrl(id, 'user_id')
    if(code){return res.status(code).send(message)}
    if(user_id !== info.user_id){return res.status(401).send("You can't delete this link")}}
    
    {const { code, message } = await deleteUrl(id)
    if(code){return res.status(code).send(message)}}

    return res.sendStatus(204)
}