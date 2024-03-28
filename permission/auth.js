import jwt from 'jsonwebtoken'
export const CheckPermission = async (req,res,next)=>{
    try {
        let token = req.headers.authorization
        token = token.split(' ')[1]
        const verify = await jwt.verify(token,'123456')
        next()
    } catch (error) {
        res.status(403).send({status:false, message:"Bạn không có quyền truy cập"})
    }
}