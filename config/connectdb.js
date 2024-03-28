import mongoose from "mongoose";
export const connectdb = async ()=>{
    try {
        await mongoose.connect(`mongodb://localhost:27017/thithu`)
        console.log(`Kết nối DB thành công`);
    } catch (error) {
        console.log(`Không thể kết nối DB. Mã lỗi: ${error}`);
    }
}