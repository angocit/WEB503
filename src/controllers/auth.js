import { userModel } from "../models/user.js"

export const Register = async (req,res)=>{
    const userdata = req.body
    try {
        const user = await new userModel(userdata).save()
        res.status(201).send({message:"Đăng ký thành công"})
    } catch (error) {
        console.log(error);        
        res.status(400).send({message:"Đăng ký thất bại"})
    }
}