
import hotelModel from '../modules/hotel/hotel.model.js'
import bcryptjs from "bcryptjs";
import { generateJWT } from "../helpers/generate-JWT.js";
import userModel from '../modules/user/user.model.js';
import roomModel from '../modules/room/room.model.js';
import reviewModel from '../modules/review/review.model.js';

//ver reviews y rooms
export const createHotel = async(req, res) =>{
const { name, address, phone, email, rooms} = req.body;
const allowed = req.user;
if(allowed.role !== "ADMIN_ROLE"){
    return res.status(403).json({
        msg: 'You cannot acces to this function'
    });
}
/*
const roomsConst = await roomModel.findOne({type: rooms});
const roomsId = roomsConst._id;
const reviewsConst = await reviewModel.findOne({review: reviews});
const reviewsId = reviewsConst._id;
*/
try{
    const newHotel = new hotelModel({
        name,
        address,
        phone,
        email,
        //rooms: roomsId
    })
    await newHotel.save();
    res.status(200).json({
        msg: "hotel successfully added",
        newHotel,
      });
}catch(e){
    res.status(500).json({
        msg: "error  adding",
        error: e.message
      });
}
}


export const deletehotel = async(req, res) =>{
    const { id } = req.params;
    const allowed = req.user;

    if(allowed.role !== "ADMIN_ROLE"){
        return res.status(403).json({
            msg: 'You cannot acces to this function'
        });
    }
    await hotelModel.findByIdAndUpdate(id, { status: false });
    const deletedhotelModel = await hotelModel.findById(id);
    res.status(200).json({
        msg: 'hotelModel deleted successfully ',
        deletedhotelModel
    });
}


export const showAllHotels = async(req, res) =>{
   const allowed = req.user;
   if(allowed.role !== "ADMIN_ROLE"){
    return res.status(403).json({
        msg: 'You cannot acces to this function'
    });
   }
   const hotelss = await hotelModel.find({status: true});
   res.status(200).json({
   hotelss
});
}

export const updateHotelName = async(req, res) =>{
    const { id } = req.params;
    const allowed = req.user;
    if(allowed.role !== "ADMIN_ROLE"){
        return res.status(400).json({
            msg: "You cannot access this function"
        });
    }
    const { name } = req.body;
    await hotelModel.findByIdAndUpdate(id, { name:name});
    const newName = await hotelModel.findById(id);
    res.status(200).json({
        msg: "Hotel changed name",
        newName
    });
}
