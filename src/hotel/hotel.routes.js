
import { Router } from "express";
import { check } from "express-validator";
import { createHotel, getHotels, getHotelsByAdministrator, deleteHotel, searchHotelsByName } from "./hotel.controller.js";
import { validateCampus } from "../middlewares/validate-campus.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router()

router.get('/', getHotels)

router.get(
  "/:idUser",
  [
    check("idUser", "The id is not a valid MongoDB format").isMongoId(),
    validateCampus
  ], getHotelsByAdministrator);

router.post(
  '/search/',
  [
    check("name", "The name can't be empty").not().isEmpty(),
    validateCampus
  ], searchHotelsByName);

router.post(
  "/:idUser",
  [
    check("name", "The name can't be empty").not().isEmpty(),
    check("address", "The address can't be empty").not().isEmpty(),
    check("phone", "The phone must be numeric").isNumeric(),
    check("email", "The email can't be empty").not().isEmpty(),
    validateCampus
  ], createHotel);

router.delete(
  "/:idHotel",
  [
    check("idHotel", "The id is not a valid MongoDB format").isMongoId(),
    validateCampus
  ], deleteHotel);





export default router;
