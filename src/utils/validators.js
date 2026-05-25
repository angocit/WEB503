import { body } from "express-validator"
export const ProductValidation = [
    body('name').trim().isLength({min:6}).withMessage("Tên không để trống và > 6 ký tự"),
    body('price').trim().isFloat({min:0}).withMessage("Giá phải là số và không âm")
]