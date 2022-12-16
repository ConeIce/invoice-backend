import express from "express";
import controller from "../controllers/CustomerController.js";

const router = express.Router();

router.get("/", (req, res) => {
  controller.getAll(req, res);
});

router.get("/:id", (req, res) => {
  controller.getByID(req, res);
});

router.post("/", (req, res) => {
  controller.post(req, res);
});

router.put("/", (req, res) => {
  controller.put(req, res);
});

export default router;
