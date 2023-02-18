import Customer from "../models/Customer.js";

export default {
  getAll: async (req, res) => {
    const customers = await Customer.find({ userId: req.user.id });
    res.json(customers);
  },
  search: async (req, res) => {
    const results = await Customer.find({
      $text: { $search: req.params.term },
      userId: req.user.id,
    });
    res.json(results);
  },
  getByID: async (req, res) => {
    const customer = await Customer.findOne({
      _id: req.params.id,
      userId: req.user.id,
    }).exec();
    res.json(customer);
  },
  post: async (req, res) => {
    req.body["userId"] = req.user.id;
    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();

    res.json(savedCustomer);
  },
  put: async (req, res) => {
    const editedCustomer = await Customer.updateOne(
      { _id: req.body._id },
      req.body
    );
    res.json(editedCustomer);
  },
};
