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

const validateCustomer = async (req) => {
  await Promise.all(customerValidationRules().map((rule) => rule.run(req)));
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.send("Validation error");
  }
};

const createCustomer = async (req, res, next) => {
  try {
    req.body["userId"] = req.user.id;
    await validateCustomer(req);

    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();

    res.json(savedCustomer);
  } catch (error) {
    next(error);
  }
};

const getPaginatedCustomers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
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
    next(error);
  }
};

export default {
  getAll: getPaginatedCustomers,
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
