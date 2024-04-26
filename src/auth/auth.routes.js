import { Router } from "express";
import { check } from "express-validator";
import { login, register, deleteUser,editUser } from "./auth.controller.js";
import { validateCampus } from "../middlewares/validate-campus.js";
import { existentEmail, userNameExist } from "../middlewares/db-validators.js";
import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router()

router.post('/login', 
    [
        check('email', 'This is an invalid email').isEmail(),
        check('password','The password is required').not().isEmpty(),
        check('password','The password will be more than 6 characters').isLength({min:6,}),
        validateCampus
    ], login)

router.post('/register', 
    [
        check('email', 'This is an invalid email').isEmail(),
        check('email').custom(existentEmail),
        check('name','The name is required').not().isEmpty(),
        check('password','The password is required').not().isEmpty(),
        check('password','The password will be more than 6 characters').isLength({min:6,}),
        validateCampus
    ], register)

    router.put(
        "/userEdit",
        [
          validateJWT,
          check("name", "The name can't be empty").not().isEmpty(),
          check("name").custom(userNameExist),
          check("email", "The email cant be empty").isEmail(),
          check("email").custom(existentEmail),
          check("password").isLength({
            min:6
          }),
          validateCampus,
        ],
        editUser
      );

    
 
      /*
      router.delete(
        "/",
        [
          validateJWT,
          check("password", "Must be at least 6 characters").isLength({
            min: 6,
          }),
          validateCampus,
        ],
        deleteUser
      );
      */

export default router;