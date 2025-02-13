import express from 'express'
import { addProduct, ProductList,editProduct,DeleteProduct } from './controllers/product.js'
import mongoose from 'mongoose'
import { Register,Login } from './controllers/auth.js'
import { CheckPermission } from './middleware/auth.js'
const app = express()
const port = 8000
app.use(express.json())
app.get(`/products`,ProductList)
app.post(`/products`,CheckPermission,addProduct)
app.put(`/products/:id`,editProduct)
app.delete(`/products/:id`,DeleteProduct)
//Tạo router register
app.post('/register',Register)
app.post('/login',Login)
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