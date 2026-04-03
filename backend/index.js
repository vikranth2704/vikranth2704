import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import registerRoute from "./routes/register.js";
import paymentRoute from "./routes/payment.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Root route (important)
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

// ✅ API routes
app.use("/register", registerRoute);
app.use("/payment", paymentRoute);

// ✅ Correct PORT handling
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
