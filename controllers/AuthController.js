import User from "../models/User.js";
import bcrypt from "bcryptjs";
import passport from "passport";

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

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const saveUser = async (username, email, password) => {
  const newUser = newUser({
    username,
    email,
    password,
  });

  await newUser.save((err) => {
    if (err) throw err;

    res.send("User Created");
  });
};

const registerUser = async (req, res, next) => {
  if (userExists(req.body.username)) {
    const hashedPassword = hashPassword(req.body.password);
    saveUser(req.body.username, req.body.email, hashedPassword);
  } else {
    res.send("User already exists");
  }
};

export default {
  login: handleLogin,
  register: registerUser,
};
