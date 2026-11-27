import express from 'express'
import { login, register } from '../controllers/auth.js'
import { authValidator } from '../untils/validators.js'
const router = express.Router()
router.post('/register',authValidator,register)
router.post('/login',login)
export default router