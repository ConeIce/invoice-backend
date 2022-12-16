import express from "express";
import controller from "../controllers/UserController.js";

const router = express.Router();

router.put("/gst", (req, res) => {
  controller.postGST(req, res);
});

router.get("/gst", (req, res) => {
  controller.getGST(req, res);
});

export default router;
