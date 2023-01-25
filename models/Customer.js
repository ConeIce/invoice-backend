import mongoose, { Schema } from "mongoose";
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose.connection);

const Customer = mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
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

Customer.plugin(autoIncrement.plugin, {
  model: "Customer",
  field: "customer_id",
});

export default mongoose.model("Customer", Customer);
