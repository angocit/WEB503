import { UserModel } from "../models/users.js"
import bcrypt from 'bcryptjs'
import { ValidateRegister } from "../validates/auth.js"
export const Register = async(req,res)=>{
    try {
        const body = req.body
        //Destructuring
        const {email,password} = body 
        const {error} = ValidateRegister.validate(body,{abortEarly:false})
        if (error) throw {mes:error.details.map(item=>item.message),code:400}
        // Ktra tồn tại email
        const check = await UserModel.findOne({email:email})
        if (check) throw {mes:"Tài khoản đã tồn tại",code:400}
        // Mã hóa mật khẩu
        body.password = await bcrypt.hash(password,11)
        const user = await new UserModel(body).save()
        user.password = undefined
        res.status(201).send({message:"Đăng ký thành công",status:true,data:user})
    } catch (error) {
        res.status(error.code??500).send({message:error.mes??"Đăng ký thất bại",status:false})
    }
}