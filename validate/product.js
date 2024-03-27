import Joi from 'joi';
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
// export const ValidateProduct = (body)=>{
//    const {error} =  ProductObject.validate(body);
//    return error;
// }
export const ValidateProduct = (req,res,next)=>{
    const {error} =  ProductObject.validate(req.body);
    if (error){
        res.send({status:true,message:error.message}); 
    }
    else {
        next();
    }
 }