import mongoose from "mongoose";

const Invoice = mongoose.Schema({
  customer: { type: String, required: true }, // we need this to be a valid cust. relations??
  name: { type: String, required: true },
  date: { type: Date, required: true },
  items: { type: String, required: true }, // we need a list for this
  totalCost: { type: Number, required: true },
});

export default mongoose.model("Invoice", Invoice);
