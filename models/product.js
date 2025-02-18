import mongoose,{Schema} from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
const productSchema = Schema(
    {
        name:{
            type:String,
            required:true
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
        },
        category:[{
            type:Schema.ObjectId,
            ref:"categorys"
        }]
    },
    {
        timestamps:true
    }
)
productSchema.plugin(mongoosePaginate);
productSchema.index({ name: 'text'});
export const ProductModel = mongoose.model('products',productSchema)
const CategorySchema = Schema({
    name: {
        type:String,
        required:true
    },
    description:String
},{
    timestamps:true
}
)
export const CategoryModel = mongoose.model("categorys",CategorySchema)