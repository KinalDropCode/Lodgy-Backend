import { Router } from "express";
import { check } from "express-validator";
import {  createEvent, getEvent, getEventsByAdministrator, getEventsByHotel, deleteEvent, editRoom } from "./event.controller.js";
import { validateCampus } from "../middlewares/validate-campus.js";
import {  eventIdDoesntExist ,hotelIdExist ,hotelNameDoesntExist } from "../middlewares/db-validators.js";
import { validateJWT } from "../middlewares/validate-jwt.js";


const router = Router();

router.get('/', getEvent)

router.get(
    "/:idUser",
    [
        check("idUser", "The id is not a valid MongoDB format").isMongoId(),
        validateCampus
    ], getEventsByAdministrator);
router.get(
    "/hotel/:idHotel", 
    [
        check("idHotel", "The id is not valida MongoDB format").isMongoId(),
        validateCampus
    ], getEventsByHotel);

router.post(
    "/:idUser",
    [
        validateCampus
    ], createEvent);

router.delete(
    "/:idEvent",
    [
        check("idEvent", "The id is not a valid MongoDB format").isMongoId(),
        validateCampus
    ], deleteEvent);


export default router;