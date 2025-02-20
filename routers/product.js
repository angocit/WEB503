import express from "express"
import { AddCategory,addProduct, ProductList,editProduct,DeleteProduct } from '../controllers/product.js'
const router = express.Router()
router.get(`/products`,ProductList)
router.post(`/products`,addProduct)
router.put(`/products/:id`,editProduct)
router.delete(`/products/:id`,DeleteProduct)
router.post('/categorys',AddCategory)
export default router