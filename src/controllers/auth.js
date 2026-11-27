import userModel from '../models/users.js'
import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
export const register = async (req,res)=>{
    const validate = validationResult(req)
        if (!validate.isEmpty()){
            const message = validate.errors.map(item=>item.msg)          
            res.status(400).send({message:message})
        }
    const userinfo = req.body
    // Tìm xem tài khoản tồn tại hay chưa qua email
    try {
        const user = await userModel.findByEmail(userinfo.email)
        // Nếu tìm thấy => Thông báo tài khoản đã tồn tại
        if (user) return res.status(400).send({message:"Tài khoản đã tồn tại"})
        // Nếu không tìm thấy=> thực hiện tạo mới
        // Mã hóa mật khẩu
        const haspassword = await bcrypt.hash(userinfo.password,10)
        userinfo.password = haspassword
        const data = await userModel.create(userinfo)
        res.status(201).send({message:"Đăng ký thành công"})
    } catch (error) {
        res.status(500).send({message:"Đăng ký thất bại"})
    }
}
export const login = async(req,res)=>{
    const userinfo = req.body
    try {
        // Tìm xem tài khoản tồn tại hay chưa qua email
        const user = await userModel.findByEmail(userinfo.email)
        // Nếu không tìm thấy thì báo tài khoản không tồn tại
        if (!user) return res.status(404).send({message:"Tài khoản không tồn tại"})
        // Nếu tìm thấy => Ktra mật khẩu có khớp hay không
        const check = await bcrypt.compare(userinfo.password,user.password)
        // Nếu so sánh không khớp=> Sai mật khẩu
        if (!check) return res.status(400).send({message:"Sai mật khẩu"})
        // So sánh khớp=> Tạo token
        const token = jwt.sign({id:user.id,email:user.email},'123456',{expiresIn:"1d"})
        res.status(200).send({message:"Đăng nhập thành công",token:token})
    } catch (error) {
        console.log(error);
        
        res.status(500).send({message:"Đăng nhập thất bại"})
    }
}