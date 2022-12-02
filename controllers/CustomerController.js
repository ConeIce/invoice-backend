import Customer from "../models/Customer.js";

export default {
  getAll: (req, res) => {
    res.send("this route works");
  },
  post: async (req, res) => {
    req.body["userId"] = req.user.id;
    const newCustomer = new Customer(req.body);
    console.log(newCustomer);
    const savedCustomer = await newCustomer.save();

    res.json(savedCustomer);
  },
};
