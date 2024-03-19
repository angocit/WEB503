import express from "express";
import VideoModel from "../models/video.js";
import Joi from 'joi'
// Tạo Joi Object
const VideoJoiObject = Joi.object({
    title: Joi.string().required().min(10).empty().messages({
        "any.required": "Tên video không để trống",
        "string.empty": "Tên video không để trống",
        "string.min":"Tên video không nhỏ hơn 10 kí tự"
    }),
    author: Joi.string().required().empty().messages({
        "any.required": "Tên tác giả không để trống",
        "string.empty": "Tên tác giả không để trống",
    }),
    url: Joi.string().required().empty().messages({
        "any.required": "URL không để trống",
        "string.empty": "URL không để trống",
    }),
    duration: Joi.number().required().min(10).messages({
        "any.required": "Thời gian video không để trống",
        "number.empty": "Thời gian video không để trống",
        "number.min":"Thời gian quá ngắn"
    })
});
const videorouter = express.Router();
videorouter.post('/videos',(req,res,next)=>{
    const body = req.body;
    const {error} = VideoJoiObject.validate({
        title:body.title,
        author: body.author,
        url: body.url,
        duration:body.duration
    })
    if (error) {
        res.send(error.message);
    }
    else{
        next();
    }
},async (req,res)=>{
    try {
        const body = req.body;
        const video = new VideoModel(body);
        const response = await video.save();
        res.send(response)
    } catch (error) {
        res.send(error) 
    }
    
})
export default videorouter;