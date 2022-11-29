import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";

import passport from "passport";
import passportLocal from "passport-local";

import * as dotenv from "dotenv";
dotenv.config();

import AuthRoute from "./routes/auth.js";
import CustomerRoute from "./routes/customer.js";
import InvoiceRoute from "./routes/invoice.js";

const app = express();
const PORT = 4000;

await mongoose.connect(process.env.CONNECTION_URL);
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());
// require("./passportConfig")(passport);
import passportConfig from "./passportConfig.js";
import isLoggedIn from "./isLoggedIn.js";
passportConfig(passport);

app.get("/", (req, res) => {
  res.send("Hey there");
});

app.use("/auth", AuthRoute);
app.use("/customer", isLoggedIn, CustomerRoute);
app.use("/invoice", isLoggedIn, InvoiceRoute);

app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));
