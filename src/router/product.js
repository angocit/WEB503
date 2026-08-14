import express from 'express'
import { ProductModel, UserModel } from '../models/product.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
const ProductValidator = [
    body('name').trim().isLength({min:6}).withMessage("Tên không để trống và > 5 kí tự"),
    body('price').isFloat({min:1}).withMessage("Giá phải là số và > 0")
]

const router = express.Router()
// Lấy danh sách
router.get('/products',async (req,res)=>{
    // const {limit,category}= req.query
    try {
        const products = await ProductModel.find()
        res.send({message:"Lấy dữ liệu thành công",data:products})
    } catch (error) {
         res.send({message:"Lấy dữ liệu thất bại"})
    }
})
// Lấy chi tiết
router.get('/products/:id',async (req,res)=>{
    const {id} = req.params
    try {
        const product = await ProductModel.findById(id)     
        res.send({message:"Lấy thành công",data:product})
    } catch (error) {
        res.send({message:"Lấy dữ liệu thất bại"})
    }
})
// cập nhật
router.put('/products/:id',ProductValidator,async(req,res)=>{
    const {id} = req.params
    try {
         const error = validationResult(req)
        // Check error có trống hay không
        if (!error.isEmpty()){
            // Lấy thông tin thông báo
            const message = error.errors.map(item=>item.msg)
            return res.send({message})
        }
        // Tìm sản phẩm xem có không
        const check = await ProductModel.findById(id)
        if (!check) return res.send({message:"Không tìm thấy sản phẩm"})
        // Lấy dữ liệu từ body gửi lên
        const product = req.body      
        // Thực hiện cập nhật vào database
        const productupdate = await ProductModel.findByIdAndUpdate(id,product,{new:true})
        res.send({message: "Cập nhật thành công",data:productupdate})
    } catch (error) {
        res.send({message:"Cập nhật thất bại"})
    }
})
// Xóa
router.delete('/products/:id',async (req,res)=>{
     const {id} = req.params
    try {
        // Tìm sản phẩm xem có không
        const check = await ProductModel.findById(id)
        if (!check) return res.send({message:"Không tìm thấy sản phẩm"})
        // Thực hiện xóa
        const product = await ProductModel.findByIdAndDelete(id)
        res.send({message:"Xóa thành công",data:product})
    } catch (error) {
        res.send({message:"Xóa thất bại"})
    }
})
// Thêm mới
router.post('/products',ProductValidator,async (req,res)=>{
    try {
        const error = validationResult(req)
        // Check error có trống hay không
        if (!error.isEmpty()){
            // Lấy thông tin thông báo
            const message = error.errors.map(item=>item.msg)
            return res.send({message})
        }
        const product = req.body
        const newproduct = await new ProductModel(product).save()
        res.send({message:"Thêm mới thành công",data:newproduct})
    } catch (error) {
        res.send({message:"Thêm mới thất bại"})
    }
})
router.post('/register',async (req,res)=>{
    try {
        const user = req.body
        // KIểm tra email tồn tại hay chưa?
        const check = await UserModel.findOne({email:user.email})
        // Nếu check tồn tại => Thông báo email đã tồn tại
        if (check) return res.send({message:"Email đã tồn tại"})
        // Mã hóa mật khẩu
        user.password = await bcrypt.hash(user.password,10)
        const newuser = await new UserModel(user).save()
        // Loại bỏ thông tin password trước khi trả dữ liệu user về cho người dùng
        newuser.password = undefined
        res.send({message:"Đăng ký thành công",data:newuser})
    } catch (error) {        
        res.send({message:"Đăng ký thất bại"})
    }
})
// Chức năng đăng nhập
// Link API: localhost:3000/login
// import jwt from 'jsonwebtoken'
router.post('/login',async (req,res)=>{
    try {
        const user = req.body
        // KIểm tra email tồn tại hay chưa?
        const check = await UserModel.findOne({email:user.email})
        // Nếu không tồn tại thì thông báo là tài khoản không tồn tại
        if (!check) return res.send({message:"Tài khoản không tồn tại"})
        // So sánh mật khẩu có khớp hay không
        const password = check.password // mật khẩu đã mã hóa lưu trong db
        const compare = await bcrypt.compare(user.password,password)
        if (!compare) return res.send({message:"Sai mật khẩu"})
        // Tạo token
        const token = jwt.sign({name:check.name,email:check.email},'123456')
        // Gửi thông tin cho người dùng
        res.send({message:"Đăng nhập thành công",token:token,data:{name:check.name,email:check.email}})
    } catch (error) {
          res.send({message:"Đăng nhập thất bại"})     
    }
})
export default router