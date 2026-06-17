import express from 'express'
import { connectDB } from './src/config/database.js';
import ProductRouter from './src/router/product.js'
import UserRouter from './src/router/auth.js'
import CatRouter from './src/router/category.js'
import UploadRouter from './src/router/upload.js'
const app = express();
const port = 3000
app.use(express.json()) // Phải có cái này mới lấy được dữ liệu từ body
app.use('/',ProductRouter)
app.use('/',CatRouter)
app.use('/files',UploadRouter)
app.use('/auth',UserRouter)
app.listen(port, async () => {
    await connectDB()
    console.log(`Endpoint http://localhost:${port}`);
})