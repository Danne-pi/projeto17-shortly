import response from "../repository/response.js";

export default function schemaValidation(schema, data, code){
    const resp = new response
    const { error } = schema.validate(data, { abortEarly: false });
    
    if (error) {
        const errors = error.details.map((detail) => detail.message);

        return resp.direct(code || 422, errors)
    }
    return resp.continue
}


////////////////////////////////////////////////////////////


export async function idParamSanitization(req, res, next) {
    let { id } = req.params
    id = Number.parseInt(id)
    id = isNaN(id) ? "" : id

    res.locals.id = id
    
    next();
}