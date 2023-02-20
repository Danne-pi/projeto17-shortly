import { Router } from "express";
import { access, create, getUrlInfo, remove } from "../controllers/urls.controllers.js";
import { authValidation, idParamSanitization } from "../middlewares/generics.js";
import { urlCreateValidation } from "../middlewares/urls.middlewares.js";

const router = Router()

router.post("/urls/shorten", authValidation, urlCreateValidation, create)
router.get("/urls/:id", idParamSanitization, getUrlInfo)
router.delete("/urls/:id", authValidation, idParamSanitization, remove)
router.get("/urls/open/:shortUrl?", access)


export default router