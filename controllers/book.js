import BookModel from "../models/book.js"
export const GetALLBook = async(req,res)=>{
    try {
        const books = await BookModel.find()
        res.status(200).send({status:true, data:books})
    } catch (error) {
        res.status(503).send({status:false, message:'Lỗi không xác định'})
    }
}
export const GetBookByID=async(req,res)=>{
    try {
        const books = await BookModel.findOne({_id:req.params.id})
        res.status(200).send({status:true, data:books})
    } catch (error) {
        res.status(503).send({status:false, message:'Lỗi không xác định'})
    }
}
export const AddBooks = async (req, res) => {
    try {
        const bookmodel = new BookModel(req.body)
        const book = await bookmodel.save()
        res.status(200).send({status:true,data:book})
    } catch (error) {
        res.status(502).send({status:false,message:"Lỗi thêm sản phẩm"})
    }
}
export const UpdateBooks = async (req, res) => {
    try {
        // lấy id truyền vào
        const id = req.params.id
        const book = await BookModel.findOneAndUpdate({_id:id},req.body,{new:true})
        res.status(200).send({status:true,data:book})
    } catch (error) {
        res.status(502).send({status:false,message:`Lỗi cập nhật sản phẩm ${error}`})
    }
}
export const DeleteBooks = async (req, res) => {
    try {
        // lấy id truyền vào
        const id = req.params.id
        const book = await BookModel.findOneAndDelete({_id:id})
        res.status(200).send({status:true,data:book,message:"Xóa thành công"})
    } catch (error) {
        res.status(502).send({status:false,message:`Lỗi xóa sản phẩm ${error}`})
    }
}