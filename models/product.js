import mongoose from "mongoose";
const ProductSchema = mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    sku:{
        type:String,
        unique:true,  // Giá trị là duy nhất,
    },
    image:{
        required:true,
        type:String
    },
    price:{
        required:true, // Bắt buộc phải nhập
        type:Number
    },
    size: {
        type: String,
        enum:['S','M','L'], // Giá trị phải thuộc phần tử trong mảng
        default:'S'  // Giá trị mặc định
    }
},{
    timestamps:true
})
export const ProductModel = mongoose.model('products',ProductSchema)