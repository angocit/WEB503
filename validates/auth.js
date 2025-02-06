import Joi from 'joi'
export const ValidateRegister = Joi.object({
    name:Joi.string().required().trim().messages({
        "any.required":"Tên bắt buộc phải nhập",
        "string.empty":"Tên không bỏ trống"
    }),
    email:Joi.string().required().trim().email().messages({
        "any.required":"Email bắt buộc phải nhập",
        "string.empty":"Email không bỏ trống",
        "string.email":"Email chưa đúng định dạng"
    }),
    password:Joi.string().required().trim().min(5).messages({
        "any.required":"Tên không bỏ trống",
        "string.empty":"Tên không bỏ trống",
        "string.min":"Mật khẩu phải > 5 kí tự"
    })
})