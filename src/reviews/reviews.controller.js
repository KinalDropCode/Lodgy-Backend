import reviewModel from "../modules/review/review.model.js";
import hotelModel from "../modules/hotel/hotel.model.js";

/*
export const reviewPost = async (req, res) =>{
    try{
        const { id } = req.params;
        const { review } = req.body;
        const allowed = req.user;
        const reviiws = new reviewModel({
            review: review,
            date,
            hotel : allowed.id
        });
        await reviiws.save();

        const reviewConstII = await hotelModel.findById(id);

        await reviewConstII.addComemntById(reviiws._id);

        res.status(200).json({
            msg: 'Succes',
            reviiws
        });

    }catch(e){
        res.status(500).json({
            msg: 'Error adding',
            error: e.message
        })
    }
}
*/