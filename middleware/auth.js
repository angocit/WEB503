import Jwt from 'jsonwebtoken'
export const CheckPermission = async (req,res,next)=>{
    try {
        // Lấy token người dùng gửi
        let token = req.headers.authorization
        if (!token) throw {mes:"Không tồn tại token"}
        token = token.split(' ')[1]
        if (!token) throw {mes:"Phương thức token không đúng"} 
        // Xác thực token
        const user = Jwt.verify(token,'123456')
        req.body.user = user
        next()
    } catch (error) {
        res.status(400).send({message:error.mes??'Xác thực người dùng không thành công',status:false})       
    }
}