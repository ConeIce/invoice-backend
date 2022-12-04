import Invoice from "../models/Invoice.js";

export default {
  getAll: async (req, res) => {
    const invoices = await Invoice.find({ userId: req.user.id });
    res.json(invoices);
  },
  getByID: async (req, res) => {
    await Invoice.findOne(
      { _id: req.params.id, userId: req.user.id },
      (err, invoice) => {
        if (err) throw err;
        if (invoice) {
          res.json(invoice);
        }
      }
    );
  },
  post: async (req, res) => {
    req.body["userId"] = req.user.id;
    const newInvoice = new Invoice(req.body);
    const savedInvoice = await newInvoice.save();

    res.json(savedInvoice);
  },
};
