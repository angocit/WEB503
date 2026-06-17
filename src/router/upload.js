import { Router } from "express";
import multer from "multer";
import fs from 'fs'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null,uniqueSuffix+'-'+file.originalname)
  }
})

const upload = multer({ storage: storage })
const router = Router()
router.post('/uploads',upload.any(),(req,res)=>{
    try {
        const filename = req.files[0].filename
        res.status(200).send({message:"Upload thành công",url: `/files/images/${filename}`})
    } catch (error) {
        res.status(503).send({message:"Upload thất bại"})
    }

})
// Link để hiển thị ảnh
router.get('/images/:name', (req,res)=>{
    try {
        const {name} = req.params
        // console.log(name); 
        const image = fs.readFileSync(`uploads/${name}`)
        res.contentType('image/jpeg')   
        res.send(image)    
    } catch (error) {
        res.status(404).send({message:"Không tìm thấy link ảnh"})
    }
})
export default router