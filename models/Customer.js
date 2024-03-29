import mongoose, { Schema } from "mongoose";

const Customer = mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    companyName: { type: String },
    GSTIN: { type: String },

    invoices: [
      {
        type: Schema.Types.ObjectId,
        ref: "invoice",
      },
    ],
  },
  { timestamps: true }
);

Customer.index({
  name: "text",
  email: "text",
  country: "text",
  state: "text",
  city: "text",
  companyName: "text",
});

export default mongoose.model("Customer", Customer);
