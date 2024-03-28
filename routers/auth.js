import express from 'express'
import { Authvalidate,AuthvalidateLogin } from '../validate/validate.js'
import {RegisterUser,UserLogin} from '../controllers/auth.js'
const authrouter = express.Router()
authrouter.post('/register',Authvalidate,RegisterUser)
authrouter.post('/login',AuthvalidateLogin,UserLogin)
export default authrouter