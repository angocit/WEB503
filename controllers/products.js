import { products } from '../models/products.js';
import {ValidateProduct} from '../validate/product.js'
export const addProduct = async (req,res)=>{
    try {     
    
    // const error = ValidateProduct(req.body)
    // if (error){
    //     res.send({status:true,message:error.message}); 
    // }
    // else {
    const product = await new products(req.body).save();
    res.status(200).send({status:true,data:product}); 
    // }
    } catch (error) {
        res.status(503).send({status:true,message:"Can not access DB"});   
    }
}
export const getProduct = async(req,res)=>{
    try { 
    const response = await products.find();
    res.status(200).send(response)
    } catch (error) {
        res.status(503).send({status:true,message:"Can not access DB"});     
    }
}
export const editProduct = async(req,res)=>{
    try {
    const id = req.params.id;
    const body = req.body;
    const response = await products.findOneAndUpdate({_id:id},body,{new:true});
    res.status(200).send(response)
    } catch (error) {
        res.status(503).send({status:true,message:"Can not access DB"});      
    }
}
export const deleteProduct = async(req,res)=>{
    try {
    const id = req.params.id;
    const response = await products.findOneAndDelete({_id:id});
    res.status(200).send(response)
} catch (error) {
    res.status(503).send({status:true,message:"Can not access DB"});    
}
}