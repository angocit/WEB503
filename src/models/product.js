import { Schema,model } from "mongoose";
const productSchema = new Schema({
    name:String,
    image:String,
    price:{
        type:Number,
        require:true, // Bắt buộc phải nhập
        default: 0 // Thiết lập giá trị mặc định
    }
}
,{
    timestamps:true
})
export const productModel = model("products",productSchema)