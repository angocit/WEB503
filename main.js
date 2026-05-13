import express from 'express'
const app = express();
const port = 3000
app.use(express.json()) // Phải có cái này mới lấy được dữ liệu từ body
app.get('/products',(request,response)=>{
    response.send("Xin chào WD21102 Ahihih")
})
app.get('/products/:id',(request,response)=>{
    // Lấy id
    // const id = request.params.id
    const {id} = request.params
    response.send(`Banj vừa yêu cầu lấy thông tin sản phẩm có id là ${id}`)
})
app.get('/search',(request,response)=>{
    // const keyword = request.query.keyword
    const {keyword} = request.query
    response.send(`Từ khóa bạn vừa tìm kiếm là: ${keyword}`)
})
app.post('/products',(request,response)=>{
    // lấy dữ liệu từ body người dùng gửi lên
    const productdata = request.body
    //Lấy dữ liệu qua headers
    const {authorization} = request.headers
    // response.send({product:productdata,token:authorization})
    // trả về json
    // response.json({productdata})
    response.status(201).send({product:productdata,token:authorization})
})
app.put('/products',(request,response)=>{
    response.send("Đây là phương thức put")
})
app.delete('/products',(request,response)=>{
    response.send("Đây là phương thức delete")
})
app.listen(port,()=>{
    console.log(`Endpoint http://localhost:${port}`);
})