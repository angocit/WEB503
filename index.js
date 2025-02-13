import express from 'express'
import mongoose from 'mongoose'
import { AddProduct,ProductList,EditProduct,DeleteProduct} from './controllers/product.js'
import { Register,Login } from './controllers/auth.js'
const app = express()
const port = 3000
app.use(express.json())
// Xây dựng hàm kết nối database
const connectDb = async ()=>{
    try {
        await mongoose.connect(`mongodb://localhost:27017/wd19318`)
        console.log(`Kết nối DB thành công`);        
    } catch (error) {
        console.log(`Kết nối DB không thành công`);
    }
}
// Tạo route thêm mới sản phẩm
app.post('/products',AddProduct)
//Tạo route lấy danh sách sản phẩm
app.get('/products',ProductList)
app.put('/products/:id',EditProduct)
app.delete('/products/:id',DeleteProduct)
// Tạo router register
app.post('/register',Register)
app.post('/login',Login)
app.listen(port,async()=>{
    // Gọi hàm kết nối database
    await connectDb()
    console.log(`Endpoint http://localhost:${port}`);    
})