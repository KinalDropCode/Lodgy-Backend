import express from 'express'
import { reservationPost, deleteReservationId, getReservationById, reservationUpdate } from './reservation.controller.js';
import { validateJWT } from '../middlewares/validate-jwt.js';

const api = express.Router(); 
api.post('/create', validateJWT, reservationPost)
api.delete('/delete/:id', validateJWT, deleteReservationId)
api.get('/:id', validateJWT, getReservationById)
api.put('/update/:id', validateJWT, reservationUpdate)


export default api