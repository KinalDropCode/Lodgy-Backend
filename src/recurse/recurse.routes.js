import { Router } from "express";
import { check } from "express-validator";
import { validateCampus } from "../middlewares/validate-campus.js";
import {  eventIdDoesntExist ,recurseIdDoesntExist } from "../middlewares/db-validators.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { recursePOST, recurseDelete, recursePut, getRecurseById } from "./recurse.controller.js";

const router = Router();

router.put(
    "/:id",
    [
        validateJWT,
        check("id").isMongoId(),
        check("id").custom(recurseIdDoesntExist),
        check("name","The name cant be empty").not().isEmpty(),
        check("description", "The description is oblogatory").not().isEmpty(),
        check("price").isNumeric(),
        validateCampus
    ],recursePut
);


router.post(
    "/:id",
    [
        check("id").isMongoId(),
        check("id").custom(eventIdDoesntExist),
        validateJWT,
        check("name","The name is obligatory").not().isEmpty(),
        check("description", "The description is oblogatory").not().isEmpty(),
        check("price").isNumeric(),
        validateCampus
    ], recursePOST
);

router.delete(
    "/:id",
    [
        validateJWT,
        check("id").isMongoId(),
        check("id").custom(recurseIdDoesntExist),
        validateCampus
    ],recurseDelete
)

router.get(
    "/:id",
    [
        validateJWT,
        validateCampus
    ],getRecurseById
)


export default router;