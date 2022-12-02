import Customer from "../models/Customer.js";

export default {
  getAll: async (req, res) => {
    const customers = await Customer.find({ userId: req.user.id });
    res.send(customers);
  },
  getByID: async (req, res) => {
    const query = Customer.where({ _id: req.params.id, userId: req.user.id });
    query.findOne((err, customer) => {
      if (err) throw err;
      if (customer) {
        res.send(customer);
      }
    });
  },
  post: async (req, res) => {
    req.body["userId"] = req.user.id;
    const newCustomer = new Customer(req.body);
    console.log(newCustomer);
    const savedCustomer = await newCustomer.save();

    res.json(savedCustomer);
  },
};
