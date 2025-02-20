import dotenv from "dotenv"
import mongoose from "mongoose";
// Xây dựng hàm kết nối database
export const connectDb = async ()=>{
    try {        
        await mongoose.connect(dotenv.config().parsed.DB_URL)
        console.log(`Kết nối DB thành công`);        
    } catch (error) {
        console.log(error);
        
        console.log(`Kết nối DB không thành công`);
    }
}