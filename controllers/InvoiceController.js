import Invoice from "../models/Invoice.js";
import Customer from "../models/Customer.js";
import puppeteer from "puppeteer";

import generateInvoiceHTML from "./helpers/generateInvoiceHTML.js";

export default {
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
    req.body["userId"] = req.user._id;
    console.log(req.user);
    const count = await Invoice.countDocuments({ userId: req.user._id });
    const newInvoice = new Invoice(req.body);
    newInvoice.invoiceNo = count + 1;
    const savedInvoice = await newInvoice.save();

    res.json(savedInvoice);
  },
  download: async (req, res) => {
    console.log(req.user.id);
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
