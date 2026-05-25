import { Router } from "express";
import { ProductAdd, ProductByID, ProductDelete, ProductEdit, ProductList } from "../controllers/product.js";
import { VerifyUser } from "../utils/verify.js";

const router = Router()
router.get('/products',ProductList)
// Lấy chi tiết
router.get('/products/:id', ProductByID)
router.post('/products',VerifyUser,ProductAdd)
// sửa 
router.put('/products/:id', ProductEdit)
// Xóa
router.delete('/products/:id', ProductDelete)
export default router