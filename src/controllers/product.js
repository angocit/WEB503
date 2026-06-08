import { validationResult } from 'express-validator';
import { productModel } from '../models/product.js';
export const ProductList =  async (request, response) => {
    const {gprice,keyword,page,limit} = request.query
    // console.log(gprice);    
    const option = {}
    if (gprice){
        option.price = {$gte:gprice}
    }  
    if (keyword){
        option.$text = {$search:keyword}
    }
    // let skip = 0
    let limitvalue = limit||20
    let pagevalue = page||1
    // if (limit){
    //     limitvalue = limit
    // }
    // if (page){
    //     pagevalue = page
    // }
    // const products = await productModel.find(option).populate("category")
    // const products = await productModel.find(option).populate({path:"category",select: "name createdAt"})
    // .skip(skip) // Bỏ qua bao nhiêu bản ghi
    // .limit(limitvalue) // Giới hạn số lượng bản ghi
    // .sort({price:1,name:1})  // Sắp xếp theo giá và tên (cái nào viết trước thì ưu tiên trước)
     const myCustomLabels = {
        totalDocs: 'total',
        docs: 'products',
        limit: 'limit',
        page: 'currentPage',
        nextPage: 'next',
        prevPage: 'prev',
        totalPages: 'pagetotal',
        pagingCounter: 'slNo',
        meta: 'paginator',
        };
    const products = await productModel.paginate(option,
        {
            limit:limitvalue,
            page:pagevalue,
            customLabels:myCustomLabels
        })
    response.status(200).send(
        {
            message: "Lấy danh sách thành công",
            data: products
        }
    )
}
export const ProductByID = async (request, response) => {
    // Lấy id
    // const id = request.params.id
    try {
        const { id } = request.params
        // 2 Cách tìm.
        // Cách 1: Tìm theo field
        // const product = await productModel.findOne({_id:id})
        // Cách 2: Tìm theo id
        const product = await productModel.findById(id)
        response.status(200).send({ message: "Lấy danh sách thành công", data: product })
    } catch (error) {
        response.status(503).send({ message: "Lấy danh sách thất bại" })
    }
}
export const ProductAdd = async (request, response) => {
    // lấy dữ liệu từ body người dùng gửi lên
    try {
        const error = validationResult(request)
        if (!error.isEmpty()){
            // console.log(error);
            const message = error.errors.map(item=>item.msg)
            return response.send({message})
        }
        const productdata = request.body
        const product = await new productModel(productdata).save()
        response.status(201).send({ message: 'Thêm mới thành công', data: product })
    } catch (error) {
        response.status(503).send({ message: 'Thêm mới thất bại' })
    }
}
export const ProductEdit = async (request, response) => {
    // Lấy id 
    const { id } = request.params
    try {
        // Truy vấn để kiểm tra id có tồn tại hay không
        const product = await productModel.findById(id)
        // Kiểm tra product
        if (product) {
            // Thực hiện cập nhật
            //Lấy dữ liệu người dùng gửi lên
            const data = request.body
            const newproduct = await productModel.findOneAndUpdate({ _id: id }, data, { new: true })
            // Phản hồi lại cho người dùng
            response.status(200).send({ message: "Cập nhật thành công", data: newproduct })
        }
        else {
            response.status(404).send({ message: "ID này không tồn tại" })
        }
    } catch (error) {
        response.status(503).send({ message: "Cập nhật không thành công" })
    }

}
export const ProductDelete = async (request, response) => {
    try {
        // Lấy id
        const { id } = request.params
        // Truy vấn để kiểm tra id có tồn tại hay không
        const product = await productModel.findById(id)
        if (product) {
            // Thực hiện xóa
            const result = await productModel.findOneAndDelete({ _id: id })
            response.status(200).send({ message: "Xóa thành công", data: result })
        }
        else {
            response.status(404).send({ message: "Không tìm thấy sản phẩm này" })
        }
    } catch (error) {
        response.status(503).send({ message: "Xóa thất bại" })
    }
}