import mongoose from "mongoose";

const User = mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  GSTIN: { type: String },
  accountNumber: { type: String },
  accountName: { type: String },
  branchName: { type: String },
  name: { type: String },
});

export default mongoose.model("User", User);
