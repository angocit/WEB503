import { UploadFile,ReadImageFromStorage } from '../controllers/upload.js'
import { upload } from "../models/upload.js"
import express from "express"
const route = express.Router()
route.post('/upload',upload.any(),UploadFile)
// Tạo route đọc link ảnh
route.get('/:filename',ReadImageFromStorage)
export default route