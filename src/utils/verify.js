export const VerifyUser =  (req,res,next)=>{
    // . Kiểm tra user  bằng cách kiểm tra authorization có tồn tại trong header hay không
    const {authorization} = req.headers
    if (authorization) {
        next()
    }
    else {
        res.status(403).send({message:"Bạn không có quyền truy cập"})
    }
}