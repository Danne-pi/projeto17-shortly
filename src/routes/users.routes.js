import { Router } from "express";
import { create } from "../controllers/users.controllers.js";
import { userCreateValidation } from "../middlewares/users.middlewares.js";

const router = Router()

router.post("/signup", userCreateValidation, create)
router.post("/signin")
router.get("/users/me")


export default router