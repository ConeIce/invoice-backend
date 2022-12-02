import Customer from "../models/Customer.js";

export default {
  getAll: async (req, res) => {
    const customers = await Customer.find({ userId: req.user.id });
    res.send(customers);
  },
  post: async (req, res) => {
    req.body["userId"] = req.user.id;
    const newCustomer = new Customer(req.body);
    console.log(newCustomer);
    const savedCustomer = await newCustomer.save();

    res.json(savedCustomer);
  },
};
