import express from 'express'
import { getAll } from '../controllers/product.js'
const router = express.Router()
router.get('/products',getAll)
export default router