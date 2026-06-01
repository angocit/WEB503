import { validationResult } from "express-validator"
import { userModel } from "../models/user.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
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
        const udata = await userModel.findOne({email:userdata.email})       
        if (udata){
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
export const Login = async(req,res)=>{
    const {email,password} = req.body
    const error = validationResult(req)
    if (!error.isEmpty()){
        const message = error.errors.map(item=>item.msg)
        return res.status(400).send({message})
    }
    try { 
    const user = await userModel.findOne({email:email})
    if (!user){
        return res.status(404).send({message:"Tài khoản không tồn tại"})
    }
    // Check mật khẩu có hợp lệ hay không
    const check = await bcrypt.compare(password,user.password)
    if (!check){
        return res.status(400).send({message:"Mật khẩu không hợp lệ"})
    }
    // Tạo token
    const token = jwt.sign({id:user._id,email:user.email,name:user.name,role:user.role},'123456',{expiresIn:600})
    // Loại bỏ password
    user.password=undefined
    res.status(200).send({message: "Đăng nhập thành công",user,token})
} catch (error) {
    res.status(503).send({message:"Có lỗi khi đăng nhập"})
    }
}