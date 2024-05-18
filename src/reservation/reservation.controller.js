import roomModel from "../modules/room/room.model.js";
import hotelModel from "../modules/hotel/hotel.model.js";
import reservationModel from "../modules/reservation/reservation.model.js";


export const reservationPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { checkIn, checkOut, totalPrice, observation, status } = req.body;
        const allowed = req.user;
        const reservation = new reservationModel({
            checkIn, checkOut, totalPrice, observation, status,
            hotel: allowed.id, 
            room: allowed.id
        });
        await reservation.save();
        const hotel = await hotelModel.findBydId(req.body.hotel);
        await hotel.addEventById(reservation._id);
        const room = await roomModel.findBydId(req.body.room);
        await room.addEventById(reservation._id);
        
        res.status(200).json({
            msg: "reservation ready", 
            reservation
        })
    } catch (error) {
        res
            .status(500)
            .json({msg: "error publishing", error: error.message});
    }
}

export const deleteReservationId = async(req, res) => {
    const { id } = req.params; 

    await reservationModel.findBydIdAndUpdate(id, {status: false});
    const reservationCanceled = await reservationModel.findBydId(id);
    res.status(200).json({
        msg: "room successfully eliminated",
        roomCanceled,
    });
}

export const getReservationById = async (req, res) => {
    try{
        const { id } = req.params; 
        const reservation = await reservationModel.findBydId(id);
        if(!reservation){
            return res.status(404).json({msg: "reservation not found"});

        }
        res.status(200).json({room});
    }catch(error){
        res.status(500).json({msg: "error getting reservation", error: error.message});
    }
}
export const reservationUpdate = async (req, res) => {
    const { id } = req.params;
    const { hotel, room, checkIn, checkOut, totalPrice, observation, status} = req.body;

    try{
        await reservationModel.findBydIdAndUpdate(id, {hotel, room, checkIn, checkOut, totalPrice, observation, status})

        res.status(200).json({
            msg: "reservation update",
        })
    }catch(error){
        res
            .status(500)
            .json({msg: "error publishing", error: error.message});
    }
}