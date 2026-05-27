import { Router } from "express";
import { Register } from "../controllers/auth.js";
import { RegisterValidation } from "../utils/validators.js";
const router = Router()
router.post('/register',RegisterValidation,Register)
export default router