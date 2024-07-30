import { authValidate, signinValidate } from "../Shemas/auth";
import User from '../models/auth'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const signup = async (request, response) => {
    // Lấy dữ liệu gửi lên
    // console.log(request.body);
    const { username, email, password } = request.body;
    // Kiểm tra dữ liệu 
    const { error } = authValidate.validate(request.body, { abortEarly: false });
    if (error) {
        // Thông báo nếu xảy ra lỗi
        const erMessage = error.details.map((mes) => mes.message);
        return response.status(400).json({ message: erMessage })
    }
    // Kiểm tra email đã tồn tại hay chưa
    const checkEmail = await User.findOne({ email: email });
    if (checkEmail) {
        return response.status(400).json({ message: "Email đã tồn tại!!!" })
    }
    // Mã khóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    // Lưu vào cơ sở dữ liệu
    const user = await User.create({ username, email, password: hashedPassword });
    user.password = undefined;
    response.status(201).json({ message: "Đăng ký tài khoản thành công!!", data: user });
}
export const signin = async (request, response) => {
    // Lấy dữ liệu gửi lên
    const { email, password } = request.body;
    // Kiểm tra dữ liệu
    const { error } = signinValidate.validate(request.body, { abortEarly: false });
    if (error) {
        const errorMessage = error.details.map((mes) => mes.message);
        return response.status(400).json({ message: errorMessage})
    }
    // Kiểm tra email có tồn tại không
    const user = await User.findOne({email : email});
    if (!user) {
        return response.status(400).json({message: "Email không tìm thấy!!!"})
    }
    // So sánh 2 mật khẩu
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        return response.status(400).json({ message : "Mật không chinh xác!!!"});
    }
    //Mật khẩu đúng
    // Tạo token
    const token = jwt.sign({id:user._id},'123456')
    // Trả về thông báo khi thành công

    user.password = undefined;
    response.status(200).json({ message : "Đăng nhập thành công!!!", data : user,token:token})
}