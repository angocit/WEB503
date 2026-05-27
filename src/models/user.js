import { Schema,model } from "mongoose";
const userSchema = new Schema({
    name:{
        type:String,
        minLength:6 // Độ dài tối thiểu
    },
    email:{
        type: String,
        unique: true, 
    },
    password:String,
    role: {
        type: String,
        enum: ["admin","user","manage"]
    }
}
,{
    timestamps:true
})
export const userModel = model("users",userSchema)