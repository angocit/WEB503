import Joi from "joi";
const AuthObj = Joi.object({
    name:Joi.string().required().empty().trim().messages({
        "any.require":"Trường tên không tồn tại",
        "string.empty":"Tên không được để trống"
    }),
    email:Joi.string().required().empty().trim().email().messages({
        "any.require":"Trường email không tồn tại",
        "string.empty":"Email không được để trống",
        "string.email":"Email không đúng định dạng"
    }),
    password:Joi.string().required().empty().trim().min(6).messages({
        "any.require":"Trường tên không tồn tại",
        "string.empty":"Tên không được để trống",
        "string.min":"Mật khẩu không nhỏ hơn 6 kí tự"
    })
})
const AuthEmailObj = Joi.object({
    email:Joi.string().required().empty().trim().email().messages({
        "any.require":"Trường email không tồn tại",
        "string.empty":"Email không được để trống",
        "string.email":"Email không đúng định dạng"
    }),
    password:Joi.string().required().empty().trim().min(6).messages({
        "any.require":"Trường tên không tồn tại",
        "string.empty":"Tên không được để trống",
        "string.min":"Mật khẩu không nhỏ hơn 6 kí tự"
    })
})
export const Authvalidate=(req,res,next)=>{
    const body = req.body;
    // console.log(req.body);
    const {error} = AuthObj.validate({name:body.name,email:body.email,password:body.password})
    if (error){
        res.status(502).send({status:false,message:error.message})
    }
    else {
        next()
    }
}
export const AuthvalidateLogin=(req,res,next)=>{
    const body = req.body;
    // console.log(req.body);
    const {error} = AuthEmailObj.validate({email:body.email,password:body.password})
    if (error){
        res.status(502).send({status:false,message:error.message})
    }
    else {
        next()
    }
}
const BookObj = Joi.object({
    name:Joi.string().required().empty().trim().messages({
        "any.require":"Trường tên không tồn tại",
        "string.empty":"Tên không được để trống"
    }),
    price:Joi.number().required().min(1000).messages({
        "any.require":"Giá không tồn tại",
        "number.min":"Giá không nhỏ hơn 1000"
    }),
    description:Joi.string().required().empty().trim().messages({
        "any.require":"Trường Mô tả không tồn tại",
        "string.empty":"Mô tả không được để trống"
    }),
    image:Joi.string().required().empty().trim().messages({
        "any.require":"Trường Ảnh không tồn tại",
        "string.empty":"Ảnh không được để trống"
    }),
    author:Joi.string().required().empty().trim().messages({
        "any.require":"Trường tác giả không tồn tại",
        "string.empty":"Tác giả không được để trống"
    })
})
export const BookValidate=(req,res,next)=>{
    const body = req.body;
    // console.log(req.body);
    const {error} = BookObj.validate(body)
    if (error){
        res.status(502).send({status:false,message:error.message})
    }
    else {
        next()
    }
}