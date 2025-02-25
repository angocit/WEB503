import { CartModel, CategoryModel, ProductModel } from "../models/product.js"
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
    const price = req.query.price;
    const keywords = req.query.keywords;
    const limit = 4
    try {
        const option = {
            price:{$gt:price},
            $text: { $search: keywords }
        }
        if (!price) delete option.price
        if (!keywords) delete option.$text
        console.log(option);
        
        // const total = await ProductModel.countDocuments()
        // const totalpage = Math.ceil(total/limit)
       // truy vấn lấy danh sách sản phẩm
    //    const products = await ProductModel.find().sort({"price":"asc"})
    //    .populate({path:"category",select:"name"})
    //    .skip((page-1)*limit)
    //    .limit(limit)
    // Phân trang bằng mongoose paginate
        const products = await ProductModel.paginate(option,{page:page,limit:limit,sort:{price:-1,name:1}})
    //    Phản hồi kết quả cho người dùng
       res.status(200).send(products)
    //    // Cách cũ
    //    res.status(200).send({
    //     message:'Tải thành công',
    //     data:products,
    //     status:true
    // })

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
export const AddToCart =async (req,res)=>{
    try {
        console.log(req.body); 
        const user = req.body.user 
        const carts = await CartModel.findOne({User:user.id,Products:req.body.products_Id})
        if (carts){
            carts.quantity +=req.body.quantity
            await CartModel.findOneAndUpdate({_id:carts._id},carts)
        }
        else {
            const newCartItem = await new CartModel({
                User:user.id,
                Products: req.body.products_Id,
                quantity:req.quantity
            }).save()
        }
        res.send({message:"Thêm giỏ hàng thành công"})
    } catch (error) {
        
    }
}