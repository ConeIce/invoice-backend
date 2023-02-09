import mongoose, { Schema } from "mongoose";

const Item = mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  cost: { type: String, required: true },
});

const Invoice = mongoose.Schema({
  invoiceNo: { type: Number, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "Customer" },
  customerId: { type: Schema.Types.ObjectId, ref: "Customer" }, // all invoices are and must be mapped to a customer
  date: { type: Date, required: true },
  items: [Item],
  discount: { type: Number, required: true },
  tax: { type: Number, required: true },
});

export default mongoose.model("Invoice", Invoice);
