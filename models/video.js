import mongoose,{Schema} from "mongoose";
const VideoSchema = new Schema({
    title: String,
    author: String,
    url: String,
    duration: Number
},
{
  timestamps:true  
}
);
const VideoModel = mongoose.model('videos',VideoSchema)
export default VideoModel;