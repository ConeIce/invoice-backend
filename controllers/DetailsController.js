import User from "../models/User.js";

export default {
  put: async (req, res) => {
    const userDetails = await User.findOne({ _id: req.user.id });

    console.log(req.body);

    userDetails.GSTIN = req.body.GSTIN;
    userDetails.accountNumber = req.body.accountNumber;
    userDetails.accountName = req.body.accountName;
    userDetails.branchName = req.body.branchName;

    await userDetails.save();
    res.json({ message: "success" });
  },
  get: async (req, res) => {
    const userDetails = await User.findOne({ _id: req.user.id });
    console.log(userDetails);
    res.json(userDetails);
  },
};
