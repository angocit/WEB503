import express from 'express'
import { addProduct, addproductMidle } from './controllers/product.js'
import mongoose from 'mongoose'
const app = express()
const port = 3000
app.get(`/products`,(request,response)=>{
    // request: nhận dữ liệu từ người dùng
    //response: gửi dữ liệu cho người dùng
    response.send("Hello world, WD19319")
})
app.get('/search',(req,res)=>{
    // const keyword = req.query.keyword
    // const price = req.query.price
    const {keyword,price} = req.query
    res.send(`Từ khóa của bạn là: ${keyword} giá: ${price} `)
})
app.get('/:khuvuc/:price',(req,res)=>{
    // const khuvuc = req.params.khuvuc
    // const price = req.params.price
    const {khuvuc,price} = req.params
    res.send(`Danh mục của bạn là: ${khuvuc} giá: ${price} `)
})
app.use(express.json())
app.post(`/products`,addProduct)
const connectDB = async()=>{
    try {
        await mongoose.connect(`mongodb://localhost:27017/wd19319`)
        console.log(`Kết nối DB thành công `);        
    } catch (error) {
        console.log(`Kết nối không thành công`);        
    }
}
app.listen(port,async ()=>{
    await connectDB()
    console.log(`Endpoint http://localhost:${port}`);    
})