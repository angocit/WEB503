import { upload } from "../models/upload.js";
import fs from 'fs'
import express from "express";
const router = express.Router();
router.post('/upload',upload.any(),(req,res)=>{
    // console.log(req.files);
    res.send({status:true,url:'/files/images/'+req.files[0].filename})
})
router.get('/images/:slug',(req,res)=>{
    const img = req.params.slug;
    const imagedir = fs.readFileSync('./uploads/'+img)
    res.contentType('image/jpeg');
    res.send(imagedir)
})
export default router