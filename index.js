import express from 'express'
import dotenv from "dotenv"
import mongoose from 'mongoose'
import ProductRouter from "./routers/product.js"
import UserRouter from "./routers/auth.js"
import UploadRouter from "./routers/upload.js"
import cors from "cors"
const app = express()
const port = 8000
app.use(express.json())
var corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))
app.use('/api',ProductRouter)
app.use('/auth',UserRouter)
app.use('/file',UploadRouter)
const connectDB = async()=>{
    try {
        await mongoose.connect(dotenv.config().parsed.DB_URL)
        console.log(`Kết nối DB thành công `);        
    } catch (error) {
        console.log(`Kết nối không thành công`);        
    }
}
app.listen(port,async ()=>{
    await connectDB()
    console.log(`Endpoint http://localhost:${port}`);    
})