import Invoice from "../models/Invoice.js";
import Customer from "../models/Customer.js";
import puppeteer from "puppeteer";

import generateInvoiceHTML from "./helpers/generateInvoiceHTML.js";

export default {
  put: async (req, res) => {
    const editedInvoice = await Invoice.updateOne(
      { _id: req.params.id },
      { discountPercentage: req.body.discount, tax: req.body.tax }
    );
    res.json(editedInvoice);
  },
  getAll: async (req, res) => {
    const invoices = await Invoice.find({ userId: req.user.id });
    res.json(invoices);
  },
  getByID: async (req, res) => {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });

    res.json(invoice);
  },
  getByCustomerId: async (req, res) => {
    const invoices = await Invoice.find({
      customerId: req.query.customerId,
    });
    res.json(invoices);
  },
  post: async (req, res) => {
    req.body["userId"] = req.user.id;
    const newInvoice = new Invoice(req.body);
    const savedInvoice = await newInvoice.save();

    res.json(savedInvoice);
  },
  download: async (req, res) => {
    try {
      const invoiceData = await Invoice.findOne({ _id: req.params.id });
      const customerData = await Customer.findOne({
        _id: invoiceData.customerId,
      });

      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      const HTML = generateInvoiceHTML(invoiceData, customerData, req.user);

      await page.setContent(HTML);

      const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
      });

      res.set({
        "Content-Type": "application/pdf",
        "Content-Length": pdf.length,
      });
      res.send(pdf);

      await browser.close();
    } catch (e) {
      console.log(e);
    }
  },
};
