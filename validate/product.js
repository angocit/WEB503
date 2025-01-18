import Joi from "joi";
export const ValidateProduct = Joi.object({
    name:Joi.string().required().trim().min(5).messages({
        "any.required":"Tên không để trống",
        "string.min":"Tên sản phẩm > 5 ký tự",
        "string.empty":"Tên không để trống"
    }),
    image:Joi.string().required().trim().messages({
        "any.required":"Ảnh không để trống"
    }),
    price:Joi.number().required().min(1000).messages({
        "any.required":"Giá không để trống",
        "number.base":"Giá phải là số",
        "number.min":"Giá phải lớn hơn 1000"
    })
})