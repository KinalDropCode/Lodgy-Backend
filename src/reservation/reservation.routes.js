import express from 'express'
import { reservationPost, deleteReservationId, getReservationById, reservationUpdate } from './reservation.controller.js';
import { validateJWT } from '../middlewares/validate-jwt.js';

const api = express.Router(); 
api.post('/create', validateJWT, reservationPost)


export default api