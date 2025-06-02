
import { Router } from "express";
import { check } from "express-validator";
import { reviewPost} from "./reviews.controller.js";
import { validateCampus } from "../middlewares/validate-campus.js";

import { validateJWT } from "../middlewares/validate-jwt.js";

const router = Router();


//ver reviews y rooms
router.post(
  "/post",
  [
    validateJWT,
    check("review", "The review is too short").not().isEmpty(),
    check("review").isLength({
      min: 23
    }),
    validateCampus
  ],
  reviewPost
);


export default router;
