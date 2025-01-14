import mongoose from "mongoose";
const ProductSchema = mongoose.Schema({
    name:String,
    image:String,
    price:Number
},{
    timestamps:true
})
export const ProductModel = mongoose.model('products',ProductSchema)