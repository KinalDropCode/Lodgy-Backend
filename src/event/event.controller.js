import eventModel from "../modules/event/event.model.js";
import hotelModel from "../modules/hotel/hotel.model.js";

export const createEvent = async (req, res) => {
    const { idUser } = req.params;
    try {
        const { tipoEvento, desc, date, hotel, extras, total } = req.body;
        const event = await eventModel.create({ idUser: idUser, tipoEvento, desc, date, hotel, extras, total })
        res.status(201).json(event);
    } catch (error) {
        res.status(500).send(`Error al crear la habitación ${error}`);
    }
};

export const getEvent = async (req, res) => {
    try {
        const event = await eventModel.find({ status: true });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).send(`Error al listar los hoteles ${error}`);
    }
}

export const getEventsByAdministrator = async (req, res) => {
    const { idUser } = req.params;
    try {
        const event = await eventModel.find({ status: true, idUser: idUser });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).send(`Error al listar los hoteles ${error}`);
    }
}

export const getEventsByHotel = async (req, res) => {
    const { idHotel } = req.params;
    try {
        const event = await eventModel.find({ status: true, hotel: idHotel });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).send(`Error al listar los hoteles ${error}`);
    }
}

export const deleteEvent = async (req, res) => {
    const { idEvent } = req.params;
    try {
        const event = await eventModel.findByIdAndUpdate(idEvent, { status: false }, { new: true });
        res.status(200).json(event);
    } catch (error) {
        res.status(500).send(`Error al eliminar los hoteles ${error}`);
    }
}

export const editRoom = async (req, res) => {
    const { idEvent } = req.params;
    try {
        const { tipoEvento, desc, date, hotel, extras, total } = req.body;

        const updateField = {};
        if (tipoEvento) updateField.tipoEvento = tipoEvento
        if (desc) updateField.desc = desc
        if (date) updateField.date = date
        if (hotel) updateField.hotel = hotel
        if (extras) updateField.extras = extras
        if (total) updateField.total = total

        const event = await eventModel.findByIdAndUpdate(idEvent, updateField, { new: true });

        res.status(200).json(event);
    } catch (error) {
        res.status(500).send(`Error al editar los hoteles ${error}`);
    }
}