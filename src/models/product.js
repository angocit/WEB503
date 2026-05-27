import { Schema,model } from "mongoose";
const productSchema = new Schema({
    name:{
        type:String,
        minLength:6 // Độ dài tối thiểu
    },
    image:String,
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
export const productModel = model("products",productSchema)