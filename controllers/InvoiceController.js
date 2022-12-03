import Invoice from "../models/Invoice.js";

export default {
  getAll: (req, res) => {
    res.send("this route works");
  },
  post: async (req, res) => {
    const newInvoice = new Invoice(req.body);
    const savedInvoice = await newInvoice.save();

    res.json(savedInvoice);
  },
};
