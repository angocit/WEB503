import mongoose from "mongoose";
const AuthSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    }
})
const AuthModel = mongoose.model('users',AuthSchema);
export default AuthModel;