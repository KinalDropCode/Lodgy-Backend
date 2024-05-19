import { Router } from "express";
import { check } from "express-validator";
import { createRoom, getRooms, getRoomsByAdministrator, deleteRoom, editRoom, searchRoomsByNumberRoom } from './room.controller.js'
import { validateCampus } from "../middlewares/validate-campus.js";
import { validateJWT } from '../middlewares/validate-jwt.js';

const router = Router()

router.get('/', getRooms)

router.get(
    "/:idRoom",
    [
        check("idRoom", "The id is not a valid MongoDB format").isMongoId(),
        validateCampus
    ], getRoomsByAdministrator);

router.post(
    '/search/',
    [
        check("numberRoom", "The name can't be empty").not().isEmpty(),
        validateCampus
    ], searchRoomsByNumberRoom);

router.post(
    "/:idUser",
    [
        check("numberRoom", "The number room must be a number").isNumeric(),
        check("price", "The price must be a number").isNumeric(),
        check("capacity", "The capacity must be a number").isNumeric(),
        validateCampus
    ], createRoom);

router.delete(
    "/:idRoom",
    [
        check("idRoom", "The id is not a valid MongoDB format").isMongoId(),
        validateCampus
    ], deleteRoom);

export default router;