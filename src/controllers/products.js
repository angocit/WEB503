import Products from '../models/product';
import producValidate from '../Shemas/productsSchema';
import jwt from 'jsonwebtoken'
export const getAllProducts = async (request, response) => {
    // console.log("Get all products")
    try {
        const data = await Products.find();
        // Nếu muốn lấy giới hạn số lượng thì thêm limit(số lượng) vào sau find()
        response.status(200).json(data);
    } catch (error) {
        console.log(error);
    }
};

export const getProductsbyId = async (request, response) => {
    // console.log("Get one product")
    try {
        const data = await Products.findById(request.params.id);
        // Nếu muốn lấy giới hạn số lượng thì thêm limit(số lượng) vào sau find()
        response.status(200).json(data);
    } catch (error) {
        console.log(error);
    }
};

export const updateProducts = async (request, response) => {
    // console.log("Update products");
    try {
        const data = await Products.findOneAndUpdate(
            { _id: request.params.id },
            request.body,
            { new: true });

        response.json(data);
    } catch (error) {
        console.log(error);
    }
};

export const addProducts = async (request, response) => {
    // console.log("Create all products")
    // console.log(request.body)        
        try {
            // Lấy thông tin token từ người dùng gửi lên        
        let token = ''
        const headerauth = request.headers.authorization
        if (headerauth){
            // Lấy token từ chuỗi Bearer eyJhbGciOiJIUzI1NiIxxx là chuỗi mà người dùng gửi kèm header
            const tokensplit =  headerauth.split(' ')
            if (tokensplit.length>1){
                token = tokensplit[1]
            }
        }
            const checkToken = jwt.verify(token,'123456')
            const {error} = producValidate.validate(request.body, {abortEarly: false});
            if(error){
                const errorMessage = error.details.map((mes) => mes.message);
                return response.status(400).json(errorMessage);
            }

            const data = await Products(request.body).save();
            // const data = await Products.create(request.body);
            response.status(201).json(data);
        } catch (error) {
            response.status(400).json({message:"Bạn không quyền truy cập"});
        } 
};

export const deleteProducts = async (request, response) => {
    // console.log("Delede products")
    try {
        const data = await Products.findOneAndDelete({_id:request.params.id});
        response.status(200).json({data: data, message: "Đã xóa thành công!"});
    } catch (error) {
        console.log(error)
    }
};
