import express from "express";
import controller from "../controllers/CustomerController.js";

import { param, validationResult } from "express-validator";

const router = express.Router();

router.get("/", (req, res) => {
  controller.getAll(req, res);
});

router.get("/page/:page", (req, res) => {
  controller.getAllPaginated(req, res);
});

router.get("/:id", param("id").isMongoId(), (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json(errors);
    return;
  }

  controller.getByID(req, res);
});

router.get("/search/:term", (req, res) => {
  controller.search(req, res);
});

router.post("/", (req, res) => {
  controller.post(req, res);
});

router.put("/", (req, res) => {
  controller.put(req, res);
});

export default router;
