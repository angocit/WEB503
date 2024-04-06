import express from "express";
import AuthModel from "../models/auth.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
const authrouter = express.Router();
authrouter.post('/register',async(req,res)=>{
    try {
        const body = req.body;
        body.passwords = await bcrypt.hash(body.passwords,10);
        const auth= new AuthModel(body);
        const response = await auth.save();
        res.send(response);
    } catch (error) {
        res.send({error: error});
    }
    
});
authrouter.post('/login',async(req,res)=>{
    try {
        const body = req.body;
        const user = await AuthModel.findOne({email:body.email});
        // console.log(user);
        if (user!==null){
            const password = user.passwords;
            // console.log(password);
            const verify = await bcrypt.compare(body.passwords,password)
            if (verify){
                const token = await jwt.sign({uid:user._id},'123456');
                res.send({status:true, message:"Đăng nhập thành công",token: token})
            }
            else {
                res.send({status:true, message:"Sai tên đăng nhập hoặc mật khẩu"})
            }
        }
        else {
            res.send({status:true, message:"Sai tên đăng nhập hoặc mật khẩu"})
        }
        
    } catch (error) {
        res.send({error});
    }
    
});
export default authrouter;