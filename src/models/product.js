import { model,Schema } from "mongoose";
const productSchema = new Schema({
    name:String,
    image:String,
    price:Number
},
{
    timestamps:true
})
export const ProductModel = model("products",productSchema)

const userSchema = new Schema({
    name:String,
    email:String,
    password:String
},
{
    timestamps:true
})
export const UserModel = model("users",userSchema)