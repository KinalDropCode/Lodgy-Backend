import eventModel from "../modules/event/event.model.js";
import hotelModel from "../modules/hotel/hotel.model.js";

export const deleteEventId = async(req, res) =>{
  const { id } = req.params;

  await eventModel.findByIdAndUpdate(id, {status: false});
  const eventCanceled = await eventModel.findById(id);
  res.status(200).json({
    msg: "event successfully canceled",
    eventCanceled,
  });

}

export const eventPost = async(req, res) =>{
    try{
        const { id } = req.params;
        const{ name, date, checkIn, checkOut, price } = req.body;
        const allowed = req.user;
        const event = new eventModel({  
            name, 
            date,
            checkIn, 
            checkOut,
            price,
            hotel: allowed.id,
        });
        await event.save();

        const hotel = await hotelModel.findById(id);
        await hotel.addEventById(event._id);

        res.status(200).json({
            msg: "event comment",
            event,
        });

    }catch (error) {
        res
            .status(500)
            .json({ msg: "error publishing", error: error.message });
    }
}

export const getEventById = async (req, res) =>{
    try{
        const { id } = req.params;
        const event = await eventModel.findById(id);
        if(!event){
            return res.status(404).json({ msg: "Event not found" });    
        }
        res.status(200).json({ event });

    }catch (error) {
        res.status(500).json({ msg: "error getting event", error: error.message });
    }
}



export const eventPUT = async(req, res) =>{
    const { id } = req.params;
    const{ name, date, checkIn, checkOut, price } = req.body;
   
    try{
        await eventModel.findByIdAndUpdate(id, { name, date, checkIn, checkOut, price })

        res.status(200).json({
            msg: "Event Update",
        })

    }catch (error) {
        res
            .status(500)
            .json({ msg: "error publishing", error: error.message });
    }
}
