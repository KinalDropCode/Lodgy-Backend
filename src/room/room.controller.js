import roomModel from "../modules/room/room.model.js"
import hotelModel from "../modules/hotel/hotel.model.js"

export const createRoom = async (req, res) => {
    const { idUser } = req.params;
    try {
        const { numberRoom, price, desc, capacity, img, hotel } = req.body;
        const room = await roomModel.create({ numberRoom, price, desc, capacity, img, hotel, administrator: idUser })
        res.status(201).json(room);
    } catch (error) {
        res.status(500).send(`Error al crear la habitación ${error}`);
    }
};

export const getRooms = async (req, res) => {
    try {
        const room = await roomModel.find({ status: true });
        res.status(200).json(room);
    } catch (error) {
        res.status(500).send(`Error al listar los hoteles ${error}`);
    }
}

export const getRoomsByAdministrator = async (req, res) => {
    const { idUser } = req.params;
    try {
        const room = await roomModel.find({ status: true, administrator: idUser });
        res.status(200).json(room);
    } catch (error) {
        res.status(500).send(`Error al listar los hoteles ${error}`);
    }
}

export const getRoomsByHotel = async (req, res) => {
    const { idHotel } = req.params;
    try {
        const room = await roomModel.find({ status: true, hotel: idHotel });
        res.status(200).json(room);
    } catch (error) {
        res.status(500).send(`Error al listar los hoteles ${error}`);
    }
}

export const deleteRoom = async (req, res) => {
    const { idRoom } = req.params;
    try {
        const room = await roomModel.findByIdAndUpdate(idRoom, { status: false }, { new: true });
        res.status(200).json(room);
    } catch (error) {
        res.status(500).send(`Error al eliminar los hoteles ${error}`);
    }
}

export const editRoom = async (req, res) => {
    const { idRoom } = req.params;
    try {
        const { numberRoom, price, desc, availability, capacity, img, hotel } = req.body;

        const updateField = {};
        if (numberRoom) updateField.numberRoom = numberRoom
        if (price) updateField.price = price
        if (desc) updateField.desc = desc
        if (availability) updateField.availability = availability
        if (capacity) updateField.capacity = capacity
        if (img) updateField.img = img
        if (hotel) updateField.hotel = hotel

        const room = await roomModel.findByIdAndUpdate(idRoom, updateField, { new: true });

        res.status(200).json(room);
    } catch (error) {
        res.status(500).send(`Error al editar los hoteles ${error}`);
    }
}

export const searchRoomsByNumberRoom = async (req, res) => {
    try {
        const { numberRoom } = req.body;
        const regex = new RegExp(numberRoom, 'i');
        const room = await roomModel.find({ numberRoom: { $regex: regex }, status: true });
        res.status(200).json(room);
    } catch (error) {
        res.status(500).send(`Error al buscar los hoteles ${error}`);
    }
};