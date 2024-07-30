import express, { Router } from 'express';
import { addProducts, deleteProducts, getAllProducts, getProductsbyId, updateProducts } from '../controllers/products';

const router = express.Router();

router.get("/products", getAllProducts);

router.get("/products/:id", getProductsbyId);

router.post("/products", addProducts);

router.put("/products/:id", updateProducts);

router.delete("/products/:id", deleteProducts);

export default router;