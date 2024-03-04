const express = require('express');
const app = express();
const port = 3000;
const products = [
    {
        id:1,
        name: "Sản phẩm 1",
        price: 1000
    },
    {
        id:2,
        name: "Sản phẩm 2",
        price: 15000
    },
    {
        id:3,
        name: "Sản phẩm 3",
        price: 2000
    }
]
app.get('/products',(request,response)=>{
    // Nhận thông tin từ người dùng
    id = request.query.id;
    response.send(products);
});
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})