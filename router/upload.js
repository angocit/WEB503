import express from 'express';
import upload from '../models/upload.js'
import fs from 'fs'
import cloudinary from 'cloudinary'
import multer from 'multer';
import os from 'os'
cloudinary.v2.config({
    cloud_name: 'dyzal5ujh',
    api_key: '989538785622417',
    api_secret: 'QP7A3WiLWA6PaU6UskIOyVOaaUU',
    secure: true,
  });
const uploadCloud = multer({dest:os.tmpdir()})
const router = express.Router();
    router.post('/upload',upload.any(),(req,res)=>{
        try {
        console.log(req.files);
        const imagename = req.files[0].filename;
        const url = `/file/image/${imagename}`
        res.status(200).send({status:true,image:url})
    } catch (error) {
            
    }
    })
    router.get('/image/:filename',(req,res)=>{
        const filename = req.params.filename
        const image = fs.readFileSync(`./uploads/${filename}`)
        res.contentType('image/jpeg')
        res.send(image)
    })
    router.post('/upload2',uploadCloud.any(),async (req,res)=>{
        try {
        // console.log(req.files);
        const tmpimg = req.files[0].path
        const image = await cloudinary.uploader.upload(tmpimg);
        console.log(image);
        res.status(200).send({status:true,image:image.url})
    } catch (error) {
            
    }
    })
export default router