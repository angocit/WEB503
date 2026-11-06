import express from 'express'
const app = express()
app.use(express.json()) // Phải có đoạn này mới lấy được dữ liệu chuẩn json từ body
const port = 3000
// Thiết lập template view
app.set('view engine','ejs')
app.set('views','./views')

// http://localhost:3000/products?id=1
app.get('/products',(req,res)=>{
    const {id} = req.query    
    res.send(
        `Id sản phẩm theo Query là ${id}`
    )
})
app.get('/',(req,res)=>{
    const classname = 'WD21304'
    const number = 1
    const arr = [5,2,8,3,21,9]
    res.render('index',{classname,number,arr})
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
    // Lấy thông tin từ header
    const token = req.headers.authorization 
    // console.log(token);    
    // Để gửi kèm mã phản hồi sử dụng .status()
    res.status(201).send({message:"Thêm mới thành công",data:body,token:token})
})
app.listen(port,()=>{
    console.log(`Server đang chạy ở cổng http://localhost:${port}`);    
})