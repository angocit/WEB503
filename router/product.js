import express from 'express';
import { products } from '../models/products.js';
import Joi from 'joi';

const CheckValidate = Joi.object({
    name: Joi.string().required().empty().messages({
        "any.required":"Tên không để trống",
        "string.empty":"Tên không đúng định dạng"
    }),
    image: Joi.string().required().empty().messages({
        "any.required":"Ảnh không để trống",
        "string.empty":"Ảnh không đúng định dạng"
    }),
    price: Joi.number().required().min(1000).messages({
        "any.required":"Giá không để trống",
        "number.min":"Giá sản phẩm không nhỏ hơn 1000"
    })
})
const router = express.Router();
router.post('/products',async (req,res)=>{
    const {name,image,price} = req.body; 
    // console.log(name,image,price);   
    const {error} = CheckValidate.validate({name,image,price});
    if (error){
        // console.log(error);
        res.send({status:false,message:error.message});
    }
    else{
      const product = await new products(req.body).save();
    res.send({status:true,data:product});  
    }
})
router.get('/products',async(req,res)=>{
    const response = await products.find();
    res.send(response)
})
router.put('/products/:id',async(req,res)=>{
    const id = req.params.id;
    const body = req.body;
    const response = await products.findOneAndUpdate({_id:id},body,{new:true});
    res.send(response)
})
router.delete('/products/:id',async(req,res)=>{
    const id = req.params.id;
    const response = await products.findOneAndDelete({_id:id});
    res.send(response)
})
export default router;