import express from 'express'
import { testConnectDB } from './config/db.js'
const app = express()
app.use(express.json()) // Phải có đoạn này mới lấy được dữ liệu chuẩn json từ body
// CHỉ định đường dẫn tĩnh
app.use(express.static('public'))
const port = 3000

app.listen(port,async ()=>{
    await testConnectDB()
    console.log(`Server đang chạy ở cổng http://localhost:${port}`);    
})