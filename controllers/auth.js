import { UserModel } from "../models/users.js";
import bcrypt from 'bcryptjs'
import { ValidateRegister } from "../validate/auth.js";
import Jwt from 'jsonwebtoken'
export const Register = async (req, res) => {
    try {
        const body = req.body
        const { email, password } = body
        const {error} = ValidateRegister.validate(body,{abortEarly:false})
        if (error) throw { mes: error.details.map(item=>item.message) }
        const check = await UserModel.findOne({ email: email })       
        if (check) throw { mes: "Tài khoản đã tồn tại" }
        // Mã hóa mật khẩu
        body.password = await bcrypt.hash(password,11)
        // console.log(body);        
        const user = await new UserModel(body).save()
        user.password = undefined
        res.status(201).send({message:'Đăng ký thành công',user:user,status:true})
    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.mes??'Đăng ký thất bại',status:false})
    }
}
export const Login = async(req,res)=>{
    try {
        //lấy dữ liệu từ ng dùng gửi
        const {email,password} = req.body
        const user = await UserModel.findOne({email:email})
        if (!user) throw {mes:"Tài khoản không tồn tại"}
        // Email tồn tại
        const compare = await bcrypt.compare(password,user.password)
        if (!compare) throw {mes:"Sai mật khẩu"}
        const token = Jwt.sign({email:user.email,id:user._id,name:user.name},"123456",{expiresIn:"1h"})
        user.password = undefined
        res.status(200).send({message:'Đăng nhập thành công',user:user,token:token,status:true})
    } catch (error) {
        res.status(500).send({message:error.mes??'Đăng nhập thất bại',status:false})
    }
}