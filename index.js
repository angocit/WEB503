import express from 'express'
const app = express()
const port = 3000
app.get(`/products`,(request,response)=>{
    // request: nhận dữ liệu từ người dùng
    //response: gửi dữ liệu cho người dùng
    response.send("Hello world, WD19319")
})
app.get('/search',(req,res)=>{
    // const keyword = req.query.keyword
    // const price = req.query.price
    const {keyword,price} = req.query
    res.send(`Từ khóa của bạn là: ${keyword} giá: ${price} `)
})
app.get('/:khuvuc/:price',(req,res)=>{
    // const khuvuc = req.params.khuvuc
    // const price = req.params.price
    const {khuvuc,price} = req.params
    res.send(`Danh mục của bạn là: ${khuvuc} giá: ${price} `)
})
app.use(express.json())
app.post(`/products`,(req,res,next)=>{
    const {title} = req.body
    if (title=='ngoc') next()
    else res.status(403).send({message:"Bạn không có quyền truy cập"})
},(req,res)=>{
    // console.log(req.headers);    
    // const token = req.headers.authorization
    // const body = req.body 
    res.send({message:"Thành công"})
})
app.listen(port,()=>{
    console.log(`Endpoint http://localhost:${port}`);    
})