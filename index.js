import express from 'express'

import mongoose from 'mongoose'
import ProductRouter from "./routers/product.js"
import UserRouter from "./routers/auth.js"
import UploadRouter from "./routers/upload.js"
const app = express()
const port = 8000
app.use(express.json())
app.use('/api',ProductRouter)
app.use('/auth',UserRouter)
app.use('/file',UploadRouter)
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