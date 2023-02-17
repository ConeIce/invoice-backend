import express from "express";
import controller from "../controllers/AuthController.js";
import { body, validationResult } from "express-validator";

const router = express.Router();

router.post("/login", (req, res) => {
  controller.login(req, res);
});

router.post(
  "/register",
  body("email").isEmail(),
  body("password").isLength({ min: 5 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    controller.register(req, res);
  }
);

export default router;
