import Joi from "joi";

export const authValidate = Joi.object({
    username: Joi.string().required().min(6).trim().messages({
        "any.required": "Tên đăng nhập là bắt bược",
        "string.min": "Tên đăng nhập phải nhiều hơn 6 ký tự",
        "string.empty": "Tên đăng nhập không được để trống"
    }),
    email: Joi.string().required().trim().email().messages({
        "any.required": "Email là bắt buộc",
        "string.empty": "Email không được để trống",
        "string.email": "Email không đúng định dạng"
    }),
    password: Joi.string().required().min(6).trim().messages({
        "any.required": "Mật khẩu là bắt buộc",
        "string.min" :"Mật khẩu không ít hơn 6 ký tự",
        "string.empty": "Mật khẩu không được để trống"
    }),
    comfirmPassword: Joi.string().required().min(6).trim().valid(Joi.ref("password")).messages({
        "any.required": "Mật khẩu nhập lại là bắt buộc",
        "any.only": "Nhập lại mật khẩu chưa chính xác",
        "string.min": "Không ít hơn 6 ký tự",
        "string.empty": "Không được để trống",
    })
})

export const signinValidate = Joi.object({
    email: Joi.string().required().trim().email().messages({
        "any.required": "Email là bắt buộc",
        "string.empty": "Email không được để trống",
        "string.email": "Email không đúng định dạng",
        "string.trim": "Email không có ký tự dấu cách"
    }),
    password: Joi.string().required().min(6).trim().messages({
        "any.required": "Mật khẩu là bắt buộc",
        "string.min" :"Mật không ít hơn 6 ký tự",
        "string.empty": "Mật khẩu không được để trống",
        "string.trim": "Mật không có ký tự dấu cách"
    })
})