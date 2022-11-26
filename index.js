import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";

import passport from "passport";
import passportLocal from "passport-local";

import * as dotenv from "dotenv";
dotenv.config();

import AuthRoute from "./routes/auth.js";

const app = express();
const PORT = 4000;

await mongoose.connect(process.env.CONNECTION_URL);
app.use(express.json());
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
// require("./passportConfig")(passport);
import passportConfig from "./passportConfig.js";
passportConfig(passport);

app.get("/", (req, res) => {
  res.send("Hey there");
});

app.use("/auth", AuthRoute);
// app.use("/customers", CustomerRoute);
// app.use("/invoice", InvoiceRoute);

app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));
