import User from "../models/User.js";
import bcrypt from "bcryptjs";
import passport from "passport";
import { body, validationResult } from "express-validator";

const userValidationRules = () => {
  return [
    body("email").isEmail(),
    body("username").notEmpty(),
    body("password").isLength({ min: 8 }),
    body("GSTIN").optional().isLength({ min: 15, max: 15 }),
    body("accountNumber").optional().isLength({ min: 8, max: 20 }),
    body("accountName").optional().notEmpty(),
    body("branchName").optional().notEmpty(),
    body("name").optional().notEmpty(),
  ];
};

const handleLogin = (req, res, next) => {
  try {
    passport.authenticate("local", (err, user) => {
      if (err) throw err;
      if (!user) res.status(400).send("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send("Successfully Authenticated");
        });
      }
    })(req, res, next);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const userExists = (username) => {
  User.findOne({ username }, async (err, doc) => {
    if (err) throw err;

    if (doc) return true;

    if (!doc) return false;
  });
};

const validateUser = async (req) => {
  await Promise.all(userValidationRules().map((rule) => rule.run(req)));
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.send("Validation error");
  }
};

const saveUser = async (req) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const newUser = newUser({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  await newUser.save();
};

const createUser = async (req, res, next) => {
  if (userExists(req.body.username)) {
    try {
      await validateUser(req);
      await saveUser(req);
      res.send("User Created");
    } catch (error) {
      next(error);
    }
  } else {
    res.send("User already exists");
  }
};

export default {
  login: handleLogin,
  register: createUser,
};
