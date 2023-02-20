import { urlSchema } from "../models/Urls.js";
import { schemaValidation } from "./generics.js";

export async function urlCreateValidation(req, res, next) {
    const url = req.body;

    {const { code, message } = schemaValidation(urlSchema, url)
    if(code){return res.status(code).send(message)}}

    next();
}