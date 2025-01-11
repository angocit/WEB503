import { ProductModel } from "../models/product.js"

export const addproductMidle = (req,res,next)=>{
    const {title} = req.body
    if (title=='ngoc') next()
    else res.status(403).send({message:"Bạn không có quyền truy cập"})
}
export const addProduct = async (req,res)=>{
    const body = req.body 
    try {
        const product = await new ProductModel(body).save()
        res.status(201).send({message:"Thêm mới Thành công",status:true,data:product})
    } catch (error) {
        res.status(500).send({message:error.message||"Thêm mới thất bại",status:false})
    }
}