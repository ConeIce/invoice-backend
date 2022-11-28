import Customer from "../models/Customer.js";

export default {
  getAll: (req, res) => {
    res.send("this route works");
  },
  post: async (req, res) => {
    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();

    res.json(savedCustomer);
  },
};
