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