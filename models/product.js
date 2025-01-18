import mongoose,{Schema} from "mongoose";
const productSchema = Schema(
    {
        name:{
            type:String,
            required:true,
        },
        image:{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        size:{
            type:String,
            enum:['S','M','L'],
            default:"S"
        }
    },
    {
        timestamps:true
    }
)
export const ProductModel = mongoose.model('products',productSchema)