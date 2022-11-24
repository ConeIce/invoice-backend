import mongoose from "mongoose";

const Customer = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  companyName: { type: String },
});

export default mongoose.model("Customer", Customer);
