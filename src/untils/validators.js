import { body } from "express-validator";
export const ProductValidator = [
    body("name").trim().isLength({min:5}).withMessage("Tên không để trống và phải > 5 kí tự"),
    body("image").trim().isLength({min:1}).withMessage("Ảnh không để trống"),
    body("price").isFloat({min:0}).withMessage("Giá không âm")
]
export const authValidator = [
    body("email").trim().isLength({min:5}).withMessage("Thông tin email quá ngắn"),
    body("email").isEmail().withMessage("Email không đúng định dạng"),
    body("password").trim().isLength({min:5}).withMessage("Mật khẩu phải > 5 kí tự"),
    body("repassword").custom((value,{req})=>{
        return value===req.body.password
    }).withMessage("Mật khẩu không khớp"),
]