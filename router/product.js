import express from 'express';
import { products } from '../models/products.js';
const router = express.Router();
router.post('/products',async (req,res)=>{
    const body = req.body;    
    const product = await new products(body).save();
    res.send(product);
})
export default router;