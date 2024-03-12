import express from 'express';
const app = express();
const port = 8000;
app.use(express.json());
//Router
// localhost:8000/posts 
app.get('/posts',(req,res)=>{
// localhost:8000/posts?key="value"
    const value = req.query.key;
    res.json({value});
})
app.get('/posts/:slug',(req,res)=>{
    // localhost:8000/posts/155555
        const value = req.params.slug;
        res.json({value});
 })

 app.post('/posts',(req,res)=>{
    const body = req.body;
    res.json(body);
 })
app.listen(port,()=>{
    console.log(`Endpoint: http://localhost:${port}`);
})