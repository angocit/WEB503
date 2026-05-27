import { validationResult } from "express-validator"
import { userModel } from "../models/user.js"
import bcrypt from "bcryptjs"

export const Register = async (req,res)=>{
    const userdata = req.body
    // Check validation
    const error = validationResult(req)
    if (!error.isEmpty()){
        const message = error.errors.map(item=>item.msg)
        return res.status(400).send({message})
    }
    try {
        // Tìm xem user tồn tại hay chưa
        const udata = await userModel.find({email:userdata.email})       
        if (udata.length>0){
            return res.status(400).send({message:"Email đã tồn tại"})
        } 
        const {password} = userdata
        // Mã hóa mật khẩu
        const hashpassword = await bcrypt.hash(password,10)
        // userdata.password = hashpassword
        // const user = await new userModel(userdata).save()
        const user = await new userModel({...userdata,password:hashpassword}).save()
        user.password = undefined
        res.status(201).send({message:"Đăng ký thành công",data:user})
    } catch (error) {
        console.log(error);        
        res.status(400).send({message:"Đăng ký thất bại"})
    }
}