import mongoose from "mongoose"
import dotenv from 'dotenv'
export const connectDB = async ()=>{
    try {        
        await mongoose.connect(dotenv.config().parsed.MONGODB_URL)
        console.log('Kết nối database thành công');        
    } catch (error) {
        console.log('Kết nối database thất bại');
    }
}