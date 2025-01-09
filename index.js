// console.log(`Hello world!`);
import express, { request } from 'express'
const app = express()
const port = 3000
app.use(express.json())
app.get("/products",(resquest,response)=>{
    response.send("Hello world WD19318")
})
app.get("/search",(resquest,response)=>{
    const keyword = resquest.query.keyword
    response.send(`Từ khóa nhận được là: ${keyword} `)
})
app.get("/category/:slug",(resquest,response)=>{
    const keyword = resquest.params.slug
    response.send(`Từ khóa nhận được là: ${keyword} `)
})
app.get("/:category/:price",(resquest,response)=>{
    // const category = resquest.params.category
    // const price = resquest.params.price
    const {category,price} = resquest.params
    response.send(`Danh mục: ${category}: Giá tiền: ${price}`)
})
app.post("/products",(resquest,response)=>{
    const body = resquest.body // Bắt buộc phải khai báo app.use(express.json())
    const token = resquest.headers.authorization
    console.log(resquest.headers);
    
    response.send({'message':'Success',data:body,token:token})
})
app.listen(port,()=>{
    console.log(`Endpoint localhost:${port}`);    
})
