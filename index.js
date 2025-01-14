// console.log(`Hello world!`);
import express, { request } from 'express'
import mongoose from 'mongoose'
import { ProductModel } from './models/product.js'
const app = express()
const port = 3000
app.use(express.json())
app.get("/products",(resquest,response)=>{
    response.send("Hello world WD19318")
})
app.get("/search",(resquest,response)=>{
    const keyword = resquest.query.keyword
    response.send(`Từ khóa nhận được là: ${keyword} `)
})
app.get("/category/:slug",(resquest,response)=>{
    const keyword = resquest.params.slug
    response.send(`Từ khóa nhận được là: ${keyword} `)
})
app.get("/:category/:price",(resquest,response)=>{
    // const category = resquest.params.category
    // const price = resquest.params.price
    const {category,price} = resquest.params
    response.send(`Danh mục: ${category}: Giá tiền: ${price}`)
})
app.post("/products",async (resquest,response)=>{
    const body = resquest.body // Bắt buộc phải khai báo app.use(express.json())
    // const token = resquest.headers.authorization
    // console.log(resquest.headers);
    try {
        const product = await new ProductModel(body).save()
        response.send({'message':'Thêm mới thành công',data:product})
    } catch (error) {
        response.send({'message':'Thêm mới thất bại'})
    }
    
})
app.post('/addproduct',(req,res,next)=>{
    const {title} = req.body 
    if (title==='ngoc'){
        res.send('Bạn không có quyền')
    }
    else next()
},(req,res)=>{
    res.send('Thêm thành công')
})
const connectDB = async ()=>{
    try {
        await mongoose.connect(`mongodb://localhost:27017/quanlybanhang`)
        console.log(`Kết nối DB thành công`);
        
    } catch (error) {
        console.log(`Kết nối DB không thành công`);
        
    }
}

app.listen(port,async ()=>{
    await connectDB()
    console.log(`Endpoint localhost:${port}`);    
})
