import express from "express";
import controller from "../controllers/InvoiceController.js";

const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.user);
  controller.getAll(req, res);
});

router.post("/", (req, res) => {
  controller.post(req, res);
});

export default router;
