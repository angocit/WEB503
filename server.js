import express from 'express';
const app = express();
const port = 8080;
app.get('/search', (req, res) => {
    //
    const keywords = req.query.keyword;
    const cat_id = req.query.cat_id;
    const result = `Ban tim tu khoa ${keywords}`
    res.send(result);
});
app.get('/:danhmuccha/:danhmuccon', (req, res) => {
    //
    const parent = req.params.danhmuccha;
    const children = req.params.danhmuccon;
    const result = `Danh mục cha la ${parent} và danh muc con la ${children}`;
    res.send(result);
});
app.use(express.json());
app.post('/products', (req, res) => {
    //
    const body = req.body;
    console.log(body);
    res.send(body);
});
app.put('/products', (req, res) => {
    //
    const header = req.headers;
    console.log(header);
    res.send(header);
});
app.listen(port,()=>{
    console.log(`Endpoint: http://localhost:${port}`);
})