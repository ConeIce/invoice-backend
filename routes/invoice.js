import express from "express";
import controller from "../controllers/InvoiceController.js";

const router = express.Router();

router.get("/", (req, res) => {
  if (req.query.customerId) {
    controller.getByCustomerId(req, res);
    return;
  }

  controller.getAll(req, res);
});

router.get("/:id", (req, res) => {
  controller.getByID(req, res);
});

router.get("/:id/download", (req, res) => {
  controller.download(req, res);
});

router.post("/", (req, res) => {
  controller.post(req, res);
});

router.put("/:id", (req, res) => {
  controller.put(req, res);
});

export default router;
