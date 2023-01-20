import express from "express";
import controller from "../controllers/DetailsController.js";

const router = express.Router();

router.put("/", (req, res) => {
  controller.put(req, res);
});

router.get("/", (req, res) => {
  controller.get(req, res);
});

export default router;
