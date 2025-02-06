import { UserModel } from "../models/users.js";
import bcrypt from 'bcryptjs'
import { ValidateRegister } from "../validate/auth.js";
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