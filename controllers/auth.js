import AuthModel from "../models/auth.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
export const RegisterUser = async(req,res)=>{
    try {
        const verifyemail = await AuthModel.findOne({email:req.body.email})
        if (verifyemail!==null){
            res.status(400).send({status:false,message:'Email đã tồn tại'})
        }
        else{
        const body = req.body
        body.password = await bcrypt.hash(body.password,10)
        const usermodel = new AuthModel(body);
        const user = await usermodel.save();
        user.password = undefined
        res.status(200).send({status:true,user:user,message:'Đăng ký thành công'})
        }
    } catch (error) {
        res.status(503).send({status:false,message:`Đăng ký không thành công lỗi ${error}`})
    }
}
export const UserLogin = async (req,res)=>{
    try {
    const body = req.body
    const user = await AuthModel.findOne({email: body.email})
    if (user!==null){
        // Check password có hợp lệ không
        const verify = await bcrypt.compare(body.password,user.password)
        if (verify){
            //Tạo token
            const token = await jwt.sign({uid:user._id},'123456')
            res.status(200).send({status:true,message:`Đăng nhập thành công`,token:token})
        }
        else {
            res.status(503).send({status:false,message:`Sai tên đăng nhập hoặc mật khẩu`})
        }
    }
    else {
        res.status(503).send({status:false,message:`Email không tồn tại`})
    }
    } catch (error) {
        res.status(503).send({status:false,message:`Lỗi đăng nhập`})     
    }
}