import { Router } from "express";
import { check } from "express-validator";
import { createReservation, deleteReservation, getReservation, getReservationByAdministrator, getReservationByHotel } from "./reservation.controller.js";
import { validateCampus } from "../middlewares/validate-campus.js";
import { validateJWT } from '../middlewares/validate-jwt.js';


const router = Router();

router.get('/', getReservation);

router.get(
    "/:idReservation", 
    [
        check("idReservation", "The id is not a valid MongoDB format").isMongoId(), 
        validateCampus,
    ], 
    getReservationByAdministrator
);

router.get(
    "/hotel/:idHotel", 
    [
        check("idHotel", "The id is not a valid MongoDB format").isMongoId(),  
        validateCampus,
    ], 
    getReservationByHotel
);

router.post(
    "/", 
    [
        validateJWT,
        check("hotel", "Hotel is required").isMongoId(),
        check("room", "Room is required").isMongoId(),
        check("checkIn", "Check-in date is required and should be a valid date").isString(),
        check("checkOut", "Check-out date is required and should be a valid date").isString(),
        check("totalPrice", "Total price is required and should be a number").isNumeric(),
        check("observation", "Observation must be a string").optional().isString(),
        validateCampus
    ], 
    createReservation
);

router.delete(
    "/:idReservation", 
    [
        
        check("idReservation", "The id is not a valid MongoDB format").isMongoId(),
        validateCampus,
        
    ], 
    deleteReservation
);

export default router;