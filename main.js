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
    const pictures = [
  {
    "id": "0",
    "author": "Alejandro Escamilla",
    "width": 5000,
    "height": 3333,
    "url": "https://unsplash.com/photos/yC-Yzbqy7PY",
    "download_url": "https://picsum.photos/id/0/5000/3333"
  },
  {
    "id": "1",
    "author": "Alejandro Escamilla",
    "width": 5000,
    "height": 3333,
    "url": "https://unsplash.com/photos/LNRyGwIJr5c",
    "download_url": "https://picsum.photos/id/1/5000/3333"
  },
  {
    "id": "2",
    "author": "Alejandro Escamilla",
    "width": 5000,
    "height": 3333,
    "url": "https://unsplash.com/photos/N7XodRrbzS0",
    "download_url": "https://picsum.photos/id/2/5000/3333"
  },
  {
    "id": "3",
    "author": "Alejandro Escamilla",
    "width": 5000,
    "height": 3333,
    "url": "https://unsplash.com/photos/Dl6jeyfihLk",
    "download_url": "https://picsum.photos/id/3/5000/3333"
  },
  {
    "id": "4",
    "author": "Alejandro Escamilla",
    "width": 5000,
    "height": 3333,
    "url": "https://unsplash.com/photos/y83Je1OC6Wc",
    "download_url": "https://picsum.photos/id/4/5000/3333"
  }
 ]
    res.render('index',{classname,number,arr,pictures})
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