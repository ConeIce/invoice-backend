import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";

import winston from "winston";
import expressWinston from "express-winston";

import passport from "passport";
import passportLocal from "passport-local";

import MongoDBStoreCreator from "connect-mongodb-session";
const MongoDBStore = MongoDBStoreCreator(session);

import * as dotenv from "dotenv";
dotenv.config();

import isLoggedIn from "./isLoggedIn.js";

import AuthRoute from "./routes/auth.js";
import CustomerRoute from "./routes/customer.js";
import InvoiceRoute from "./routes/invoice.js";
import DetailsRoute from "./routes/details.js";

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

const store = new MongoDBStore({
  uri: process.env.CONNECTION_URL,
  collection: process.env.SESSION_STORE,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  })
);

app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.File({ filename: "logfile.log" }),
      new winston.transports.Console(),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
import passportConfig from "./passportConfig.js";
passportConfig(passport);

app.use("/auth", AuthRoute);
app.use("/customer", isLoggedIn, CustomerRoute);
app.use("/invoice", isLoggedIn, InvoiceRoute);
app.use("/details", isLoggedIn, DetailsRoute);

await mongoose.connect(process.env.CONNECTION_URL);
app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));
