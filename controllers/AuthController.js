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
      if (err) return next(err);

      if (!user) {
        res.send(401, { success: false, message: "Authentication failed" });
      }

      req.login(user, (err) => {
        if (err) return next(err);

        res.status(200).send("Successfully Authenticated");
      });
    });
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

const createUser = async (req, res, next) => {
  if (userExists(req.body.username)) {
    try {
      await Promise.all(userValidationRules().map((rule) => rule.run(req)));
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = newUser({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      await newUser.save((err) => {
        if (err) next(err);

        res.send("User Created");
      });
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
