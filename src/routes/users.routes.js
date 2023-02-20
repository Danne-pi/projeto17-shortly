import { Router } from "express";
import { create, login, profile, rank } from "../controllers/users.controllers.js";
import { authValidation } from "../middlewares/generics.js";
import { loginValidation, userCreateValidation } from "../middlewares/users.middlewares.js";

const router = Router()

router.post("/signup", userCreateValidation, create)
router.post("/signin", loginValidation, login)
router.get("/users/me", authValidation, profile)
router.get("/ranking/:limit?", rank)

export default router