import { useState } from "react";
import API_URL from "../api";

function Register() {
  const [name, setName] = useState("");
  const [event, setEvent] = useState("");
  const [qr, setQr] = useState("");

  // load Razorpay script
  const loadScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    if (!name || !event) {
      alert("Enter name and event");
      return;
    }

    const ok = await loadScript();
    if (!ok) {
      alert("Razorpay SDK failed to load");
      return;
    }

    // create order from backend
    const orderRes = await fetch(`${API_URL}/payment/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 500 }), // ₹500
    });

    const order = await orderRes.json();

    const options = {
      key: "rzp_test_xxxxx", // 🔁 replace with your Key ID (ONLY this, not secret)
      amount: order.amount,
      currency: "INR",
      order_id: order.id,
      name: "Event Registration",
      description: event,

      handler: async function (response) {
        // after successful payment → register user
        const res = await fetch(`${API_URL}/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            event,
            payment_id: response.razorpay_payment_id,
          }),
        });

        const data = await res.json();
        setQr(data.qrCode);
      },
