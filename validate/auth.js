import Joi from "joi";
export const ValidateRegister = Joi.object({
    name:Joi.string().required().trim().messages({
        "any.required":"Tên không để trống",
        "string.empty":"Tên không để trống"
    }),
    email:Joi.string().required().trim().email().messages({
        "any.required":"Tên không để trống",
        "string.empty":"Tên không để trống",
        "string.email":"Email không đúng định dạng",
    }),
    password:Joi.string().required().trim().min(6).messages({
        "any.required":"Tên không để trống",
        "string.empty":"Tên không để trống",
        "string.min":"Mật khẩu > 6 kí tự"
    }),
})