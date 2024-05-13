import roomModel from "../modules/room/room.model.js"
import hotelModel from "../modules/hotel/hotel.model.js"


export const roomPost = async(req, res) =>{
    try{
        const { id } = req.params;
        const{ type, price, desc, availability, status, capacity} = req.body;
        const allowed = req.user;
        const room = new roomModel({  
            type, price, desc, availability, status, capacity, 
            hotel: allowed.id,
        });
        await room.save();

        const hotel = await hotelModel.findById(req.body.hotel);
        await hotel.addEventById(room._id);

        res.status(200).json({
            msg: "room comment",
            room,
        });

    }catch (error) {
        res
            .status(500)
            .json({ msg: "error publishing", error: error.message });
    }
}

export const deleteRoomId = async(req, res) => {
    const { id } = req.params; 

    await roomModel.findByIdAndUpdate(id, {status: false});
    const roomCanceled = await roomModel.findById(id);
    res.status(200).json({
        msg: "room successfully eliminated",
        roomCanceled,
    });
}
export const getRoomById = async (req, res) =>{
    try{
        const { id } = req.params;
        const room = await roomModel.findById(id);
        if(!room){
            return res.status(404).json({ msg: "room not found" });    
        }   
        res.status(200).json({ room });

    }catch (error) {
        res.status(500).json({ msg: "error getting room", error: error.message });
    }
}

export const roomUpdate = async(req, res) =>{
    const { id } = req.params;
    const{ type, price, desc, availability, status, capacity, hotel} = req.body;
   
    try{
        await roomModel.findByIdAndUpdate(id, { type, price, desc, availability, status, capacity, hotel })

        res.status(200).json({
            msg: "room Update",
        })

    }catch (error) {
        res
            .status(500)
            .json({ msg: "error publishing", error: error.message });
    }
}