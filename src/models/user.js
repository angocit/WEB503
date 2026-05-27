import { Schema,model } from "mongoose";
const userSchema = new Schema({
    name:{
        type:String,
        minLength:6 // Độ dài tối thiểu
    },
    email:{
        type: String,
        unique: true, 
        require:true,
    },
    password:{
        type:String,
        require:true
    },
    role: {
        type: String,
        enum: ["admin","user","manage"],
        default:"user"
    }
}
,{
    timestamps:true
})
export const userModel = model("users",userSchema)