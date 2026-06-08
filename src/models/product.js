import { text } from "express";
import { Schema,model } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
const productSchema = new Schema({
    name:{
        type:String,
        minLength:6 // Độ dài tối thiểu
    },
    image:String,
    category:[{
        type:Schema.ObjectId,
        ref:"categories"
    }],
    price:{
        type:Number,
        require:true, // Bắt buộc phải nhập,
        min:0, //Giá trị tối thiểu
        default: 0 // Thiết lập giá trị mặc định
    }
}
,{
    timestamps:true
})
productSchema.index({name:"text"})
productSchema.plugin(mongoosePaginate)
export const productModel = model("products",productSchema)