import express from 'express'
import { create, deleteProduct, getAll, getById, update } from '../controllers/product.js'
const router = express.Router()
router.get('/products',getAll)
router.get('/products/:id',getById)
router.post('/products',create)
router.put('/products/:id',update)
router.delete('/products/:id',deleteProduct)
export default router