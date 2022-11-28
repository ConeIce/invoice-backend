import mongoose, { Schema } from "mongoose";

const Customer = mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  companyName: { type: String },

  invoices: [
    {
      type: Schema.Types.ObjectId,
      ref: "invoice",
    },
  ],
});

export default mongoose.model("Customer", Customer);
