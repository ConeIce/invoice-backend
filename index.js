import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";

import passport from "passport";
import passportLocal from "passport-local";

import * as dotenv from "dotenv";
dotenv.config();

import isLoggedIn from "./isLoggedIn.js";

import AuthRoute from "./routes/auth.js";
import CustomerRoute from "./routes/customer.js";
import InvoiceRoute from "./routes/invoice.js";

const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
import passportConfig from "./passportConfig.js";
passportConfig(passport);

app.use("/auth", AuthRoute);
app.use("/customer", isLoggedIn, CustomerRoute);
app.use("/invoice", isLoggedIn, InvoiceRoute);

await mongoose.connect(process.env.CONNECTION_URL);
app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));
