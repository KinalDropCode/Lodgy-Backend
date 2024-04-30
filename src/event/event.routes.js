import { Router } from "express";
import { check } from "express-validator";
import { validateCampus } from "../middlewares/validate-campus.js";
import { hotelIdExist } from "../middlewares/db-validators.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { eventPost } from "./event.controller.js";
const router = Router();

router.post(
    "/:id",
    [
        check("id").isMongoId(),
        check("id").custom(hotelIdExist),
        validateJWT,
        check("name", "The event cant be empty").not().isEmpty(),
        check("date").isDate(),
        check("checkIn").isDate(),
        check("checkOut").isDate(),
        validateCampus
    ],
    eventPost
);


export default router;