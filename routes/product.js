import express from 'express'
import {AddToCart,AddProduct,ProductList,EditProduct,DeleteProduct,AddCategory} from '../controllers/product.js'
import { CheckPermission } from '../middleware/auth.js'
const route = express.Router()
// Tạo route thêm mới sản phẩm
route.post('/products',CheckPermission,AddProduct)
//Tạo route lấy danh sách sản phẩm
route.get('/products',CheckPermission,ProductList)
route.put('/products/:id',EditProduct)
route.delete('/products/:id',DeleteProduct)
route.post('/categorys',AddCategory)
route.post('/carts',CheckPermission,AddToCart)
export default route;