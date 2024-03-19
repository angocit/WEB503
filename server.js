import express from 'express';
import router from './routers/product.js';
import videorouter from './routers/video.js'
import connect from './connect/database.js';
const app = express();
const port = 3000;
app.use(express.json());
app.use('/api',router)
app.use('/api',videorouter)
app.listen(port,async ()=>{
    await connect();
    console.log(`Endpoint: http://localhost:${port}`);
})