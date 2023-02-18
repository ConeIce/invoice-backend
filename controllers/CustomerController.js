import Customer from "../models/Customer.js";
import { body, validationResult } from "express-validator";

const customerValidationRules = () => {
  return [
    body("userId").isMongoId(),
    body("name").notEmpty(),
    body("email").isEmail(),
    body("phone").isMobilePhone(),
    body("city").notEmpty(),
    body("state").notEmpty(),
    body("country").notEmpty(),
  ];
};

const validateCustomer = async (req, res) => {
  await Promise.all(customerValidationRules().map((rule) => rule.run(req)));
  const errors = validationResult(req);
  return errors;
};

const createCustomer = async (req, res) => {
  try {
    req.body["userId"] = req.user.id;
    const errors = await validateCustomer(req, res);

    if (!errors.isEmpty()) {
      res.send(errors);
      return;
    }
    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();

    res.json(savedCustomer);
  } catch (error) {
    throw error;
  }
};

const getPaginatedCustomers = async (req, res) => {
  try {
    const page = parseInt(req.params.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const count = await Customer.countDocuments({ userId: req.user.id });
    const customers = await Customer.find({ userId: req.user.id })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      customers,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalItems: count,
    });
  } catch (error) {
    throw error;
  }
};

export default {
  getAll: getPaginatedCustomers,
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
  post: createCustomer,
  put: async (req, res) => {
    const editedCustomer = await Customer.updateOne(
      { _id: req.body._id },
      req.body
    );
    res.json(editedCustomer);
  },
};
