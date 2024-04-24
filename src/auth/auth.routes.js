import { Router } from "express";
import { check } from "express-validator";
import { login, register, editName, editPassword, deleteUser } from "./auth.controller.js";
import { validateCampus } from "../middlewares/validate-campus.js";
import { existentEmail } from "../middlewares/db-validators.js";
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
        "/",
        [
          validateJWT,
          check("name", "The name can't be empty").not().isEmpty(),
          validateCampus,
        ],
        editName
      );

    router.put(
        "/password/",
        [
          validateJWT,
          check("oldPassword", "Must be at least 6 characters").isLength({
            min: 6,
          }),
          check("newPassword", "Must be at least 6 characters").isLength({
            min: 6,
          }),
          validateCampus,
        ],
        editPassword
      );

 
      /*

      router.delete(
        "/",
        [
          validateJWT,
          check("Password", "Must be at least 6 characters").isLength({
            min: 6,
          }),
          validateCampus,
        ],
        deleteUser
      );
*/
export default router;