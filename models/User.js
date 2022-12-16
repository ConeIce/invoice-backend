import mongoose from "mongoose";

const User = mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  GSTIN: { type: String },
});

export default mongoose.model("User", User);
