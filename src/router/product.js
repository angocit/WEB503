import express from 'express'
import { create, deleteProduct, getAll, getById, update } from '../controllers/product.js'
import { verifyUser } from '../untils/verify.js'
const router = express.Router()
router.get('/products',getAll)
router.get('/products/:id',getById)
router.post('/products',verifyUser,create)
router.put('/products/:id',update)
router.delete('/products/:id',deleteProduct)
export default router