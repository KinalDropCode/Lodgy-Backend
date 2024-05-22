import roomModel from "../modules/room/room.model.js";
import hotelModel from "../modules/hotel/hotel.model.js";
import reservationModel from "../modules/reservation/reservation.model.js";


export const createReservation = async (req, res) => {
    const { uid } = req.user;

    try {
        const { hotel, room, checkIn, checkOut, totalPrice, observation } = req.body;

        const reservation = await reservationModel.create({
            userId: uid,
            hotel,
            room,
            checkIn,
            checkOut,
            totalPrice,
            observation
        });


        const updateAvailability = await roomModel.findByIdAndUpdate(room, { availability: 'DISABLED' }, { new: true });


        res.status(201).json({ reservation, updateAvailability });
    } catch (error) {
        res.status(500).send(`Error creating reservation: ${error.message}`);
    }
};

export const getReservation = async (req, res) => {
    try {
        const reservation = await reservationModel.find({ status: true });
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).send(`Error al listar las reservaciones ${error}`);
    }
}

export const getReservationByAdministrator = async (req, res) => {
    const { uid } = req.user;
    try {
        const reservation = await reservationModel.find({ status: true, userId: uid });
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).send(`Error al listar las reservaciones ${error}`);
    }
}

export const getReservationByHotel = async (req, res) => {
    const { idHotel } = req.params;
    try {
        const reservation = await reservationModel.find({ status: true, hotel: idHotel });
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).send(`Error al listar las reservaciones ${error}`);
    }
}

export const deleteReservation = async (req, res) => {
    const { idReservation } = req.params;
    try {
        const reservation = await reservationModel.findByIdAndUpdate(idReservation, { status: false }, { new: true });
        res.status(200).json(reservation);
    } catch (error) {
        res.status(500).send(`Error al eliminar los hoteles ${error}`);
    }
}