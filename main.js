import express from 'express'
import { connectDB } from './src/config/database.js';
import { productModel } from './src/models/product.js';
const app = express();
const port = 3000
app.use(express.json()) // Phải có cái này mới lấy được dữ liệu từ body
app.get('/products',async (request,response)=>{
    const products = await productModel.find()
    response.status(200).send(
        {
            message:"Lấy danh sách thành công",
            data: products
        }
    )
})
// Lấy chi tiết
app.get('/products/:id',async (request,response)=>{
    // Lấy id
    // const id = request.params.id
    try {
        const {id} = request.params
        // 2 Cách tìm.
        // Cách 1: Tìm theo field
        // const product = await productModel.findOne({_id:id})
        // Cách 2: Tìm theo id
        const product = await productModel.findById(id)
        response.status(200).send({message:"Lấy danh sách thành công",data:product})
    } catch (error) {
        response.status(503).send({message:"Lấy danh sách thất bại"})
    }
    
})
app.get('/search',(request,response)=>{
    // const keyword = request.query.keyword
    const {keyword} = request.query
    response.send(`Từ khóa bạn vừa tìm kiếm là: ${keyword}`)
})
app.post('/products',async (request,response)=>{
    // lấy dữ liệu từ body người dùng gửi lên
    try {
        const productdata = request.body
        const product = await new productModel(productdata).save()
        response.status(201).send({message:'Thêm mới thành công',data:product})
    } catch (error) {
         response.status(503).send({message:'Thêm mới thất bại'})
    }
})
app.put('/products',(request,response)=>{
    response.send("Đây là phương thức put")
})
app.delete('/products',(request,response)=>{
    response.send("Đây là phương thức delete")
})
app.listen(port,async()=>{
    await connectDB()
    console.log(`Endpoint http://localhost:${port}`);
})