import Joi from "joi";

const producValidate = Joi.object({
    name: Joi.string().required().min(6).messages({
        "any.required":"Tên sản phẩm là bắt buộc",
        "string.min": "Không ít hơn 6 ký tự"
    }),
    price: Joi.number().required().min(0).messages({
        "any.required":"Giá là bắt buộc!",
        "number.base": "Giá phải là số",
        "number.min":"Không nhỏ hơn 0"
    })
})

export default producValidate;