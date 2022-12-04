import Invoice from "../models/Invoice.js";

export default {
  getAll: async (req, res) => {
    const invoices = await Invoice.find();
    res.json(invoices);
  },
  getByID: async (req, res) => {
    await Invoice.findOne({ _id: req.params.id }, (err, invoice) => {
      if (err) throw err;
      if (invoice) {
        res.json(invoice);
      }
    });
  },
  post: async (req, res) => {
    const newInvoice = new Invoice(req.body);
    const savedInvoice = await newInvoice.save();

    res.json(savedInvoice);
  },
};
