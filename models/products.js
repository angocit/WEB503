import mongoose from "mongoose";
const pschema = mongoose.Schema({
    name:String,
    image:String,
    price:Number
});
export const products = mongoose.model('products', pschema);
