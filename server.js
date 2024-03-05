import express from 'express';
const app = express();
const port = 8080;
const products = [
    {
        id:1,
        name: "Sản pahamr 1",
        price: 10000
    },
    {
        id:2,
        name: "Sản pahamr 2",
        price: 15000
    },
    {
        id:3,
        name: "Sản pahamr 3",
        price: 40000
    },
    {
        id:4,
        name: "Sản pahamr 4",
        price: 100000
    }
];
app.get('/', (req, res) => {
    res.send('Day la trang chu');
});
app.get('/products', (req, res) => {
    res.send(products);
})
app.get('/products/:id', (req, res) => {
    // res.send(req.params.id);
    const id = req.params.id;
    const product = products.filter(data=>{
        return data.id ==id;
    })
    res.send(product);
})
app.listen(port,()=>{
    console.log(`Endpoint: http://localhost:${port}`);
})