import express from 'express'
import { ProductModel } from '../models/product.js'
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
router.put('/products/:id',async(req,res)=>{
    const {id} = req.params
    try {
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
router.post('/products',async (req,res)=>{
    try {
        const product = req.body
        const newproduct = await new ProductModel(product).save()
        res.send({message:"Thêm mới thành công",data:newproduct})
    } catch (error) {
        res.send({message:"Thêm mới thất bại"})
    }
})
export default router