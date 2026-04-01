import express from "express";
import QRCode from "qrcode";
import supabase from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, event, payment_id } = req.body;

  const qrData = `${name}-${event}-${payment_id}`;

  const qrCode = await QRCode.toDataURL(qrData);

  const { data, error } = await supabase
    .from("users")
    .insert([{ name, event, payment_id, qr: qrCode }]);

  if (error) return res.status(500).json({ error });

  res.json({
    message: "Registered successfully",
    qrCode,
  });
});

// Get users (Admin)
router.get("/", async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) return res.status(500).json({ error });

  res.json(data);
});

export default router;