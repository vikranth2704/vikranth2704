import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import registerRoute from "./routes/register.js";
import paymentRoute from "./routes/payment.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/register", registerRoute);
app.use("/payment", paymentRoute);

app.listen(process.env.PORT, () => {
  console.log("Server running on port 5000");
});