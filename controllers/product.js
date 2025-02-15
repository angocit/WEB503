import { CategoryModel, ProductModel } from "../models/product.js"
import { ValidateProduct } from "../validate/product.js"

export const AddProduct = async (req,res)=>{
    // lấy dữ liệu người dùng gửi trong body
    const {name,image,price,size} = req.body
    try {
        const {error} = ValidateProduct.validate({name,image,price,size},{abortEarly:false})
        if (error) throw {mess:error.details.map(item=>item.message)}
        const product = await new ProductModel(req.body).save()
        res.status(201).send({message:'Thêm thành công',data:product,status:true})
    } catch (error) {              
        res.status(500).send({message:error.mess??'Thêm không thành công',status:false}) 
    }
}
export const ProductList = async (req,res)=>{
    const page = req.query.page??1
    // console.log(page);
    
    const limit = 4
    try {
        const total = await ProductModel.countDocuments()
        const totalpage = Math.ceil(total/limit)
       // truy vấn lấy danh sách sản phẩm
       const products = await ProductModel.find()
       .populate({path:"category",select:"name"})
       .skip((page-1)*limit)
       .limit(limit)
       //Phản hồi kết quả cho người dùng
       res.status(200).send({
        message:'Tải thành công',
        data:products,
        status:true,
        total:total,
        currentpage: page
    })
    } catch (error) {
        console.log(error);
        
        res.status(500).send({message:'Tải sản phẩm không thành công',status:false}) 
    }
}
export const EditProduct = async (req,res)=>{
    try {
        // lấy id
        const id = req.params.id 
        const body = req.body
        const check = await ProductModel.findOne({_id:id})
        if (check)
        {
            const product = await ProductModel.findOneAndUpdate({_id:id},body,{new:true})
            res.status(200).send({message:'Cập nhật thành công',data:product,status:true})
        }
        else throw {mes:"Không tìm thấy sản phẩm"}        
    } catch (error) {
        res.status(500).send({message:error.mes??'Cập nhật không thành công',status:false})
    }
}
export const DeleteProduct = async(req,res)=>{
    try {
        // lấy id
        const id = req.params.id
        // Tìm sản phẩm
        const product = await ProductModel.findOne({_id:id})
        if (product){
            await ProductModel.findOneAndDelete({_id:id})
            res.status(200).send({message:'Xóa thành công',data:product,status:true})
        }
        else throw {mess:"Không tìm thấy sản phẩm"}
    } catch (error) {
        console.log(error);        
        res.status(500).send({message:error.mess??'Xóa không thành công',status:false})
    }
}
export const AddCategory = async(req,res)=>{
    try {
        const body = req.body 
        const category = await new CategoryModel(body).save()
        res.status(201).send({message:'Thêm thành công',data:category,status:true})
    } catch (error) {
        res.status(500).send({message:error.mess??'Thêm không thành công',status:false})
    }
}