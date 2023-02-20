import { loginSchema, userSchema } from "../models/Users.js";
import { checkUser, checkUserAlreadyExists } from "../repository/users.repository.js";
import { schemaValidation } from "./generics.js";

export async function userCreateValidation(req, res, next) {
    const user = req.body;

    if(user.password !== user.confirmPassword){
    return res.status(422).send("The password confirmation isn't equal to your password")}

    {const { code, message } = schemaValidation(userSchema, user)
    if(code){return res.status(code).send(message)}}
    
    {const { code, message } = await checkUserAlreadyExists(user.name, user.email)
    if(code){return res.status(code).send(message)}}

    next();
}


///////////////////////////////////////////////////////


export async function loginValidation(req, res, next) {
    const user = req.body;

    {const { code, message } = schemaValidation(loginSchema, user)
    if(code){return res.status(code).send(message)}}
    
    {const { code, message, info } = await checkUser(user)
    if(code){return res.status(code).send(message)}
    else{res.locals.id = info.id}}

    next();
}