import jwt from 'jsonwebtoken'

const Permission = async (req,res,next)=>{
    try {
    let token = req.headers.authorization
        token=token.split(' ')[1]
        // console.log(token);
        const verify = jwt.verify(token,'123456')
        console.log(verify);
        next();
        } catch (error) {
            res.status(403).json({status: '403 Forbidden',message:"Bạn không có quyền truy cập"})    
        }
}
export default Permission