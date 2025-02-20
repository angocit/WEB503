import { Register,Login } from '../controllers/auth.js'
import express from "express"
const route = express.Router()
// Tạo router register
route.post('/register',Register)
route.post('/login',Login)
export default route