import express from "express";
import controller from "../controllers/InvoiceController.js";

const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.user);
  controller.getAll(req, res);
});

export default router;
