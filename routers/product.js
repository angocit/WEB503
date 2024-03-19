import express from 'express';
import productmodel from '../models/product.js';
import Joi from 'joi';
const checkValidate = Joi.object({
    name:Joi.string().required().empty().messages({
        "any.required":"Tên không để trống",
        "string.empty":"Tên không để trống"
    }),
    image:Joi.string().required().empty().messages({
        "any.required":"Ảnh không để trống",
        "string.empty":"Ảnh không để trống"
    }),
    price:Joi.number().required().empty().min(500).messages({
        "any.required":"Tên không để trống",
        "number.empty":"Tên không để trống",
        "number.min":"Giá không được nhỏ hơn 500"
    })
})
const router = express.Router();
router.post('/products',(req,res,next)=>{
    const body = req.body;
    const {error} = checkValidate.validate({name:body.name,image:body.image,price:body.price})
    if (error){
        res.send({error:error.message})
    }
    else{
        next()
    }
},async (req, res)=>{
    const product = new productmodel(req.body);
    const response = await product.save();
    res.send(response);
})
router.get('/products',async (req, res)=>{
    const response = await productmodel.find();
    res.send(response);
})
router.put('/products/:id',async (req, res)=>{
    const body = req.body;
    const id = req.params.id;
    const response = await productmodel.findOneAndUpdate({_id:id},body,{new:true});
    res.send(response);
})
router.delete('/products/:id',async (req, res)=>{
    const id = req.params.id;
    const response = await productmodel.findOneAndDelete({_id:id});
    res.send(response);
})
export default router