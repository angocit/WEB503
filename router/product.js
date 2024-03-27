import express from 'express';
import {addProduct,getProduct,editProduct,deleteProduct} from '../controllers/products.js';
import Permission from '../middleware/permission.js';
import {ValidateProduct} from '../validate/product.js'
const router = express.Router();
router.post('/products',Permission,ValidateProduct,addProduct)
router.get('/products',getProduct)
router.put('/products/:id',Permission,editProduct)
router.delete('/products/:id',Permission,deleteProduct)
export default router;