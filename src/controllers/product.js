import ProductModel from '../models/products.js'
export const getAll = async (req,res)=>{
    try {
        const data = await ProductModel.findAll()
        res.status(200).send({message:"Lấy thành công",data:data})
    } catch (error) {
        console.log(error);        
        res.status(500).send({message:"Lấy không thành công",})
    }
}
export const create = async (req,res)=>{
    const body = req.body
    try {
        const result = await ProductModel.create(body)
        res.status(201).send({message:"Thêm mới thành công",data:{...body,id:result.insertId}})
    } catch (error) {
        // console.log(error);
        res.status(500).send({message:"Thêm thất bại"})
    }
}
// url dạng localhost:3000/products/1
export const update = async (req,res)=>{
    // Lấy id
    const {id} = req.params
    const body = req.body
    // Tìm xem id có tồn tại hay không
    try {
        const check = await ProductModel.findById(id)
        if (!check) res.status(404).send({message:"Không tìm thấy sản phẩm"})
       // Thực hiện cập nhật   
        const update = await ProductModel.update(id,body)
        res.status(200).send({message:"Cập nhật thành công",data:update})
    } catch (error) {
        console.log(error);        
        res.status(500).send({message:"Cập nhật thất bại"})
    }
}