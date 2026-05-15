import express from 'express'
import { connectDB } from './src/config/database.js';
import { productModel } from './src/models/product.js';
const app = express();
const port = 3000
app.use(express.json()) // Phải có cái này mới lấy được dữ liệu từ body
app.get('/products',(request,response)=>{
    response.send("Xin chào WD21102 Ahihih")
})
app.get('/products/:id',(request,response)=>{
    // Lấy id
    // const id = request.params.id
    const {id} = request.params
    response.send(`Banj vừa yêu cầu lấy thông tin sản phẩm có id là ${id}`)
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