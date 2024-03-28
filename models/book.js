import mongoose from "mongoose";
const BookSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:Number,
    description: {
        type:String,
        required:true
    },
    image: {
        type:String,
        required:true
    },
    author: {
        type:String,
        required:true
    }
})
const BookModel = mongoose.model('books',BookSchema);
export default BookModel;