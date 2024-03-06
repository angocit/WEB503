// const express = require('express');
import express from 'express';
const app = express();
const port = 3000;
// app.get('/posts', (req, res) => {
//     // Query
//     const keywords = req.query.keywords;
//     const cate_id = req.query.category;
//     console.log(keywords);
//     res.send({keywords,cate_id});
// });
app.get('/:slug1/:slug2', (req, res) => {
    const slug1 = req.params.slug1;
    const slug2 = req.params.slug2;
    res.send({slug1,slug2});
});
app.use(express.json())
app.post('/posts', (req, res) => {
    const body = req.body;
    console.log(body);
    res.send({body});
});
app.listen(port,()=>{
    console.log(`Endpoint http://localhost:${port}/posts`);
})