import { Router } from "express";
import { check } from "express-validator";
import {  eventPost, getEventById, deleteEventId, eventPUT } from "./event.controller.js";
import { validateCampus } from "../middlewares/validate-campus.js";
import {  eventIdDoesntExist ,hotelIdExist ,hotelNameDoesntExist } from "../middlewares/db-validators.js";
import { validateJWT } from "../middlewares/validate-jwt.js";


const router = Router();

router.delete(
    "/:id",
    [
        validateJWT,
        check("id").isMongoId(),
        check("id").custom(eventIdDoesntExist),
        validateCampus
    ], deleteEventId
)


router.get(
    "/:id",
    [
        validateJWT,
        validateCampus
    ], getEventById
)


/*
The isISO8601() function is a validation method provided by the express-validator library in Node.js. 
It is used to check if a string represents a date in the ISO 8601 format.
ISO 8601 is an international standard for representing dates and times. It defines a
format for dates and times that is easily readable and sortable by computers and humans alike. 
*/
router.post(
    "/:id",
    [
        check("id").isMongoId(),
        check("id").custom(hotelIdExist),
        validateJWT,
        check("name","The name cant be empty").not().isEmpty(),
        check("date", "The date is required").isISO8601().toDate(), // Convert to Date object
        check("checkIn", "Check in date is required").isISO8601().toDate(), // Convert to Date object
        check("checkOut", "Check out date is required").isISO8601().toDate(),
        check("price","Price cant be empty").isNumeric(),
        validateCampus,
    ], eventPost
);

router.put(
    "/:id",
    [
        validateJWT,
        check("id").isMongoId(),
        check("id").custom(eventIdDoesntExist),
        check("name","The name cant be empty").not().isEmpty(),
        check("date", "The date is required").isISO8601().toDate(), // Convert to Date object
        check("checkIn", "Check in date is required").isISO8601().toDate(), // Convert to Date object
        check("checkOut", "Check out date is required").isISO8601().toDate(),
        check("price","Price cant be empty").isNumeric(),
        validateCampus,
    ], eventPUT
)


export default router;