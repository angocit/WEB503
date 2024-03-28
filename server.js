import express from 'express';
import { connectdb } from './config/connectdb.js';
import authrouter from './routers/auth.js';
import bookrouter from './routers/book.js';
const app = express();
app.use(express.json())
app.use('/auth',authrouter)
app.use('/',bookrouter)
const port = 4000
app.listen(port,()=>{
    connectdb()
    console.log(`Endpoint http://localhost:${port}`);
})