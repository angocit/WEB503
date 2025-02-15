import { CategoryModel, ProductModel } from "../models/product.js"
import { ValidateProduct } from "../validates/product.js"

export const addproductMidle = (req,res,next)=>{
    const {title} = req.body
    if (title=='ngoc') next()
    else res.status(403).send({message:"Bạn không có quyền truy cập"})
}
export const addProduct = async (req,res)=>{
    const body = req.body
    const {name,image,price,size} = body
    try {
        const {error} = ValidateProduct.validate({name,image,price,size},{abortEarly:false})
        if (error) throw {mess:error.details.map(item=>item.message)}
        const product = await new ProductModel(body).save()
        res.status(201).send({message:"Thêm mới Thành công",status:true,data:product})
    } catch (error) {
        // console.log(error);        
        res.status(500).send({message:error.mess??"Thêm mới thất bại",status:false})
    }
}
export const ProductList = async (req,res)=>{
    const page = req.query.page??1
    const limit = req.query.limit??4
    try {
        //Đếm số lượng bản ghi
        // const total = await ProductModel.countDocuments()
        // // Tính số trang
        // const totalpage = Math.ceil(total/limit)
        // const products = await ProductModel.find()
        // .populate({path:"category",select:"name"})
        // .skip((page-1)*limit)
        // .limit(limit)
        // res.status(200).send({
        //     message:"Tải sản phẩm thành công",
        //     status:true,
        //     data:products,
        //     total,
        //     totalpage,
        //     curentpage:page
        // })

        // Phân trang bằng plugin
        const results = await ProductModel.paginate({},{
            page:page,
            limit:limit,
            populate:{path:"category",select:"name"}
        })
        res.status(200).send(results)
    } catch (error) {
        res.status(500).send({message:"Lỗi tải sản phẩm",status:false})
    }
}
export const editProduct = async (req,res)=>{
    try {
        const id = req.params.id 
        const body = req.body 
        // Kiểm tra id có tồn tại trong db hay không
        const product = await ProductModel.findOne({_id:id})
        if (product){
            const newproduct = await ProductModel.findOneAndUpdate({_id:id},body,{new:true})
            res.status(200).send({message:"Cập nhật thành công",status:true,data:newproduct})
        }
        else throw {mes:"Không tìm thấy sản phẩm",code:404}
    } catch (error) {
        res.status(error.code??500).send({message:error.mes??"Cập nhật không thành công",status:false}) 
    }
}
export const DeleteProduct = async (req,res)=>{
    try {
        // Lấy id
        const id = req.params.id
        // Tìm sản phẩm theo id
        const product = await ProductModel.findOne({_id:id})
        if (product){
            await ProductModel.findOneAndDelete({_id:id})
            res.status(200).send({message:"Xóa sản phẩm thành công",status:true})
        }
        else throw {mes:"Không tìm thấy sản phẩm",code:404}
    } catch (error) {
        // console.log(error);        
        res.status(error.code??500).send({message:error.mes??"Xóa không thành công",status:false})
    }
}
export const AddCategory = async(req,res)=>{
    try {
        const body = req.body 
        const category = await new CategoryModel(body).save()
        res.status(201).send({message:"Cập nhật thành công",status:true,data:category})
    } catch (error) {
        res.status(error.code??500).send({message:error.mes??"Thêm không thành công",status:false})
    }
}