import express from "express"
import multer from "multer"
import fs from "fs"
import dotenv from "dotenv"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {    
      cb(null, Date.now()+"-"+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
const router = express.Router()
router.post("/upload",upload.any(),(req,res)=>{
    try {
        const filename = req.files[0].filename
        res.status(200).send({status:true,message:"upload thành công",url:dotenv.config().parsed.DOMAIN+"/file/"+filename})
    } catch (error) {
        res.status(500).send({status:false,message:"Upload thất bại"})
    }
})
// Đọc ảnh từ thư mục upload và hiển thị cho ng dùng
router.get("/:filename",(req,res)=>{
    try {
        const filename = req.params.filename
        const image = fs.readFileSync(`uploads/${filename}`)
        res.contentType("image/jpeg")
        res.send(image)
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
    }
})
export default router