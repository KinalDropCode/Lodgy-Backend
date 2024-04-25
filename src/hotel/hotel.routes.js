
import { Router } from "express";
import { check } from "express-validator";
import { deletehotel, createHotel, updateHotelName, showAllHotels } from "./hotel.controller.js";
import { validateCampus } from "../middlewares/validate-campus.js";
import { hotelEmailExist ,hotelPhoneRegistered ,hotelAddressRegistered ,existentEmail, hotelIdExist, hotelNameExist } from "../middlewares/db-validators.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router()

router.get(
  "/",
  [
    validateJWT,
    validateCampus,
  ], showAllHotels
)


//ver reviews y rooms
router.post(
  "/register",
  [
    validateJWT,
    check("name", "The name can't be empty").not().isEmpty(),
    check("name").custom(hotelNameExist),
    check("address", "The address can't be empty").not().isEmpty(),
    check("address").custom(hotelAddressRegistered), 
    check("phone", "The phone must be numeric").isNumeric(),
    check("phone").custom(hotelPhoneRegistered),
    check("email", "The email can't be empty").not().isEmpty(),
    check("email").custom(hotelEmailExist),
  //  check("rooms","Rooms cant be empty").isInt(),
    validateCampus
  ], 
  createHotel
);

router.delete(
    "/:id",
    [
      validateJWT,
      check("id","its not a valid format").isMongoId(),
      check("id").custom(hotelIdExist),
      validateCampus,
    ],
    deletehotel
  );

 router.put(
    "/name/:id",
    [
      validateJWT,
      check("id", "Its not a valid format").isMongoId(),
      check("id").custom(hotelIdExist),
      check("name","Name cant be empty").not().isEmpty(),
      check("name").custom(hotelNameExist),
      check("address", "The address can't be empty").not().isEmpty(),
      check("address").custom(hotelAddressRegistered), 
      check("phone", "The phone must be numeric").isNumeric(),
      check("phone").custom(hotelPhoneRegistered),
      check("email", "The email can't be empty").not().isEmpty(),
      check("email").custom(hotelEmailExist),
      validateCampus,
    ], updateHotelName
 ) ;





export default router;
