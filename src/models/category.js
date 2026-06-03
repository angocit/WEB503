import { Schema,model } from "mongoose";
const catSchema = new Schema({
    name:{
        type:String,
        minLength:6 // Độ dài tối thiểu
    }
}
,{
    timestamps:true
})
export const catModel = model("categories",catSchema)