import { Router } from "express";
import { Register,Login } from "../controllers/auth.js";
import { LoginValidation, RegisterValidation } from "../utils/validators.js";
const router = Router()
router.post('/register',RegisterValidation,Register)
router.post('/login',LoginValidation,Login)
export default router