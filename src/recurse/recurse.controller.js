import recurseModel from "../modules/recurse/recurse.model.js";
import eventModel from "../modules/event/event.model.js";


export const recursePut = async(req, res) =>{
    const { id } = req.params;
    const { name, description, price } = req.body;

    try{
        await recurseModel.findByIdAndUpdate(id, { name, description, price });

        res.status(200).json({
            msg: "Recurse updated"
        })

    }catch (error) {
        res
            .status(500)
            .json({ msg: "error adding recurse", error: error.message });
    }
}


export const getRecurseById = async(req, res) =>{
    try{
        const { id } = req.params;
        const recurse = await recurseModel.findById(id);
        if(!recurse){
            return res.status(404).json({msg: "Recurse not found"});
        }

        res.status(200).json({recurse});

    }catch (error) {
        res
            .status(500)
            .json({ msg: "error adding recurse", error: error.message });
    }
}


export const recursePOST = async(req, res) =>{
    try{
        const { id } = req.params;
        const { name, description, price } = req.body;
        const allowed = req.user;
        const recurse = new recurseModel({name, description, price, hotel: allowed.id});
        await recurse.save();

        const event = await eventModel.findById(id);
        await event.addRecurseById(recurse._id);

        res.status(200).json({
            msg: "Recurse added",
            recurse
        });

    }catch (error) {
        res
            .status(500)
            .json({ msg: "error adding recurse", error: error.message });
    }

}


export const recurseDelete = async(req, res) =>{
    const { id } = req.params;
    
    await recurseModel.findByIdAndUpdate(id, {status: false});
    res.status(200).json({
        msg: "Recurse Canceled",
        
    })
}