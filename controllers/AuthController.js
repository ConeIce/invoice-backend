import User from "../models/User.js";
import bcrypt from "bcryptjs";

export default {
  login: (req, res, next) => {
    passport.authenticate("local", (err, user) => {
      if (err) throw err;
      if (!user) res.send("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.send("Successfully Authenticated");
          console.log(req.user);
        });
      }
    })(req, res, next);
  },
  register: async (req, res) => {
    console.log(req.body);

    User.findOne({ username: req.body.username }, async (err, doc) => {
      if (err) throw err;
      if (doc) res.send("User Already Exists");
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        });
        await newUser.save();
        res.send("User Created");
      }
    });
  },
};
