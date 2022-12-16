import User from "../models/User.js";

export default {
  postGST: async (req, res) => {
    const userDetails = await User.findOne({ _id: req.user.id });
    userDetails.GSTIN = req.body.GSTIN;
    await userDetails.save();
    res.json({ GSTIN: userDetails.GSTIN });
  },
  getGST: async (req, res) => {
    const userDetails = await User.findOne({ _id: req.user.id });
    res.json({ GSTIN: userDetails.GSTIN });
  },
};
