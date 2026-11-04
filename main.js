import express from 'express'
const app = express()
const port = 3000
// http://localhost:3000/products?id=1
app.get('/products',(req,res)=>{
    const {id} = req.query    
    res.send(
        `Id sản phẩm theo Query là ${id}`
    )
})
// http://localhost:3000/products/1
app.get('/products/:id',(req,res)=>{
    const {id} = req.params    
    res.send(
        `Id sản phẩm theo params là ${id}`
    )
})
app.listen(port,()=>{
    console.log(`Server đang chạy ở cổng http://localhost:${port}`);    
})