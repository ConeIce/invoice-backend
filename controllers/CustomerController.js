import Customer from "../models/Customer";

export default {
  post: async (req, res) => {
    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();

    res.json(savedCustomer);
  },
};
