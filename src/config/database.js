import mongoose from "mongoose"
export const connectDB = async ()=>{
    try {        
        await mongoose.connect("mongodb://localhost:27017/nodesu26")
        console.log('Kết nối database thành công');        
    } catch (error) {
        console.log('Kết nối database thất bại');
    }
}