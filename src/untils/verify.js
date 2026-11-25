import jwt from 'jsonwebtoken'
export const verifyUser = async(req,res,next)=>{
    // Lấy thông tin authoziration từ header
    const {authorization} = req.headers
    // console.log(authorization);
    // Kiểm tra xem authorization có tồn tại hay không, nếu không tồn tịa thì từ chối truy cập, nếu tồn tại thì xác thực xem token có hợp lệ hay không
    if (!authorization) return res.status(403).send({message:"Bạn không được phép truy cập. (Chưa đăng nhập)"})
        try {
            // Nếu tồn tại authorization  thì tách chuỗi để lấy token
            const [,token] = authorization.split(" ")
            // Verify token
            const verify = jwt.verify(token,'123456')
            // token hợp lệ
            next()
        } catch (error) {
            // Token không hợp lệ
            res.status(403).send({message:"Token hết hạn, vui lòng đăng nhập lại"})
        }    
}