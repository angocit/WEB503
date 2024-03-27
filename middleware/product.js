import Joi from 'joi';
import jwt from 'jsonwebtoken';
const ProductObject = Joi.object({
    name: Joi.string().required().empty().messages({
        "any.required":"Tên không để trống",
        "string.empty":"Tên không đúng định dạng"
    }),
    image: Joi.string().required().empty().messages({
        "any.required":"Ảnh không để trống",
        "string.empty":"Ảnh không đúng định dạng"
    }),
    price: Joi.number().required().min(1000).messages({
        "any.required":"Giá không để trống",
        "number.min":"Giá sản phẩm không nhỏ hơn 1000"
    })
})
export const CheckProductValidate = (req,res,next)=>{
    // const {name,image,price} = req.body;
    // const {error} =  ProductObject.validate({name,image,price});
    // console.log(error.details);
    let token = req.headers.authorization;
    if (token) {
        try {            
        
        token = token.split(" ")[1]
        console.log(token);
        const verify = jwt.verify(token,'123456');
        next()
    } catch (error) {
        res.send({status:false,message:"Bạn không có quyền truy cập"})   
    }
    }
    else{
    res.send({status:false,message:"Bạn không có quyền truy cập"})
    }
    
    // if (error) {
    //     res.send({status:false,message:error.message});
    // }
    // else{
    //     next();
    // }
}