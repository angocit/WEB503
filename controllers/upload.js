
import fs from 'fs'
export const UploadFile = (req,res)=>{
    // console.log(req);
    const filename = req.files[0].filename
    res.status(200).send({status:true,url:'/file/'+filename})    
}
export const ReadImageFromStorage = (req,res)=>{
    try {
        const filename = req.params.filename
        const image = fs.readFileSync('uploads/'+filename)
        res.contentType('image/jpeg')
        res.send(image)
    } catch (error) {
        console.log(error);        
    } 
}