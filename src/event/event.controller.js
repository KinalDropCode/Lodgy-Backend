import eventModel from "../modules/event/event.model.js"
import hotelModel from "../modules/hotel/hotel.model.js"

export  const eventPost = async(req, res) => {
    try{
    const allowed = req.user;
        if (allowed.role !== "ADMIN_ROLE") {
            return res.status(403).json({
              msg: "You cannot access this function",
            });
          }
    const { id } = req.params;
    const { name , date, checkIn, checkOut } = req.body; 
    const event = new eventModel({
        name, date, checkIn, checkOut, hotel: allowed.id
    })   
    await event.save();

    const hotel = await hotelModel.findById(id);
    await hotel.addEventById(event._id);
    
    res.status(200).json({
        msg: "event posted",
        event,
    });

    }catch(error){
        res.status(500).json({ 
        msg: "error publishing", error: error.message 
    });

    }

}