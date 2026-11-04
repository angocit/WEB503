import express from 'express'
const app = express()
app.use(express.json()) // Phải có đoạn này mới lấy được dữ liệu chuẩn json từ body
const port = 3000
// http://localhost:3000/products?id=1
app.get('/products',(req,res)=>{
    const {id} = req.query    
    res.send(
        `Id sản phẩm theo Query là ${id}`
    )
})
// http://localhost:3000/products/1
app.get('/products/:id/:cat',(req,res)=>{
    const {id,cat} = req.params    
    res.send(
        `Id sản phẩm theo params là ${id}
         Danh mục là: ${cat}
        `
    )
    })
// Lấy dữ liệu từ body
app.post('/products',(req,res)=>{
    const body = req.body
    res.send({message:"Thêm mới thành công",data:body})
})
app.listen(port,()=>{
    console.log(`Server đang chạy ở cổng http://localhost:${port}`);    
})