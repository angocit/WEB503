// const express = require('express');
import express from 'express';
import { LocalStorage } from "node-localstorage";
global.localStorage = new LocalStorage('./scratch');
const app = express();
const port = 3000;
app.use(express.json())
const ProductsList = ()=>{
    let products = [];
    const items = localStorage.getItem('products');
    if (items!==null){
        products = JSON.parse(items);
    }
    return products;
}
const addProduct = (data)=>{
    const products = ProductsList();
    products.push(data);
    localStorage.setItem('products', JSON.stringify(products));
    return {"status": true,"message": "Add successfully"}
}
const ProductById = (id)=>{
    const products = ProductsList();
    const product = products.filter(product =>{
        return product.id==id;
    });
    return product;
}
// app.get('/posts', (req, res) => {
//     // Query
//     const keywords = req.query.keywords;
//     const cate_id = req.query.category;
//     console.log(keywords);
//     res.send({keywords,cate_id});
// });
// app.get('/:slug1/:slug2', (req, res) => {
//     const slug1 = req.params.slug1;
//     const slug2 = req.params.slug2;
//     res.send({slug1,slug2});
// });

// app.post('/posts', (req, res) => {
//     const body = req.body;
//     console.log(body);
//     res.send({body});
// });
// Tạo API giống json-server.
app.get('/products', (req, res) => {
    res.send(ProductsList());
});
app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const product = ProductById(id);
    res.send(product);
    // res.send(ProductsList());
});
app.post('/products', (req, res) => {
    const body = req.body;
   const mess = addProduct(body)   
    res.send(mess);
});
app.listen(port,()=>{
    console.log(`Endpoint http://localhost:${port}/products`);
})