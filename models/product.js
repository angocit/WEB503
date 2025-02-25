import mongoose, { Schema } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
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
    },
    category:[
        {
            type: mongoose.Schema.ObjectId,
            ref:"categorys"
        }
    ]
},{
    timestamps:true
})
ProductSchema.plugin(mongoosePaginate);
ProductSchema.index({name:'text'})
export const ProductModel = mongoose.model('products',ProductSchema)
const CategorySchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    description:String
},
{
    timestamps:true
}
)
export const CategoryModel = mongoose.model("categorys",CategorySchema)
const CartSchema = Schema({
    userId:{
        type:Schema.ObjectId,
        required:true,
        ref:"users"
    },
    Items:[{
        productId:{
            type:Schema.ObjectId,
            required:true,
            ref:"products"
        },
        quantity:{
            type:Number,
            default:1
        }
    }]
})
export const CartModel = mongoose.model("carts",CartSchema)