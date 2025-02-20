import express from 'express'
import mongoose from 'mongoose'
import productroute from "./routes/product.js"
import userRoute from "./routes/auth.js"
import uploadRoute from "./routes/upload.js"
import { connectDb } from './configDb/database.js'
import cors from "cors"
const app = express()
const port = 3000
app.use(express.json())
app.use(cors())
app.use('/api',productroute)
app.use('/auth',userRoute)
app.use('/file',uploadRoute)
app.listen(port,async()=>{
    // Gọi hàm kết nối database
    await connectDb()
    console.log(`Endpoint http://localhost:${port}`);    
})