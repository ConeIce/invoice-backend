import express from "express";
import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

import AuthRoute from "./routes/auth.js";

const app = express();
const PORT = 4000;

await mongoose.connect(process.env.CONNECTION_URL);

app.get("/", (req, res) => {
  res.send("Hey there");
});

app.use("/auth", AuthRoute);
// app.use("/customers", CustomerRoute);
// app.use("/invoice", InvoiceRoute);

app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));
