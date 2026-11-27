import { body } from "express-validator";
export const ProductValidator = [
    body("name").trim().isLength({min:5}).withMessage("Tên không để trống và phải > 5 kí tự"),
    body("image").trim().isLength({min:1}).withMessage("Ảnh không để trống"),
    body("price").isFloat({min:0}).withMessage("Giá không âm")
]