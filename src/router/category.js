import { Router } from "express";
import { catModel } from "../models/category.js";
const router = Router()
router.get('/categories',async(req,res)=>{
    try {
        const cat = await catModel.find()
        res.send(cat)
    } catch (error) {
        res.send(error)
    }
})
router.post('/categories',async(req,res)=>{
    try {
        const cat = await new catModel(req.body).save()
        res.send(cat)
    } catch (error) {
        res.send(error)
    }
})
export default router