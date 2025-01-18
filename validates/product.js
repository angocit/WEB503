import Joi from 'joi'
export const ValidateProduct = Joi.object({
    name:Joi.string().required().trim().min(5).messages({
        "any.required":"Tên không bỏ trống",
        "string.empty":"Tên không bỏ trống",
        "string.min":"Tên phải > 5 kí tự"
    }),
    image:Joi.string().required().trim().min(5).messages({
        "any.required":"Ảnh không bỏ trống",
        "string.empty":"Ảnh không bỏ trống"
    }),
    price:Joi.number().required().min(1000).messages({
        "any.required":"Giá không bỏ trống",
        "number.base":"Giá phải là số",
        "number.min":"Giá phải > 1000"
    }),
    size:Joi.string().valid('S','M','L').messages({
        "any.only":"Size chỉ có thể là S,M,L"
    })
})