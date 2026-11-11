import express from 'express'
import { create, getAll, update } from '../controllers/product.js'
const router = express.Router()
router.get('/products',getAll)
router.post('/products',create)
router.put('/products/:id',update)
export default router