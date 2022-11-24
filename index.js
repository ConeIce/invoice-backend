import express from "express";
import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 4000;

async function main() {
  await mongoose.connect(process.env.CONNECTION_URL);
  app.listen(PORT, () => console.log(`Server is running at PORT: ${PORT}`));
}

main();
