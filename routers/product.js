import express from "express"
import { AddToCart,AddCategory,addProduct, ProductList,editProduct,DeleteProduct } from '../controllers/product.js'
import { CheckPermission } from "../middleware/auth.js"
const router = express.Router()
router.get(`/products`,ProductList)
router.post(`/products`,addProduct)
router.put(`/products/:id`,editProduct)
router.delete(`/products/:id`,DeleteProduct)
router.post('/categorys',AddCategory)
router.post('/addtocart',CheckPermission,AddToCart)
export default router