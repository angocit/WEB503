import mongoose,{Schema} from "mongoose";
const UserSchema = Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
        }
    },
    {
        timestamps:true
    }
)
export const UserModel = mongoose.model('users',UserSchema)