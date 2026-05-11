import express from 'express'
const app = express();
const port = 8000
app.get('/products',(request,response)=>{
    response.send("Xin chào WD21102 Ahihih")
})
app.post('/products',(request,response)=>{
    response.send("Đây là phương thức post")
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