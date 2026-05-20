import express from 'express'
import { connectDB } from './src/config/database.js';
import { productModel } from './src/models/product.js';
const app = express();
const port = 3000
app.use(express.json()) // Phải có cái này mới lấy được dữ liệu từ body
app.get('/products', async (request, response) => {
    const products = await productModel.find()
    response.status(200).send(
        {
            message: "Lấy danh sách thành công",
            data: products
        }
    )
})
// Lấy chi tiết
app.get('/products/:id', async (request, response) => {
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

})
app.post('/products', async (request, response) => {
    // lấy dữ liệu từ body người dùng gửi lên
    try {
        const productdata = request.body
        const product = await new productModel(productdata).save()
        response.status(201).send({ message: 'Thêm mới thành công', data: product })
    } catch (error) {
        response.status(503).send({ message: 'Thêm mới thất bại' })
    }
})
// sửa 
app.put('/products/:id', async (request, response) => {
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

})
// Xóa
app.delete('/products/:id', async (request, response) => {
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
})
app.listen(port, async () => {
    await connectDB()
    console.log(`Endpoint http://localhost:${port}`);
})