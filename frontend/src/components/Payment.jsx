import { useState } from "react";
import React from "react";

function Payment({ name, event, setTicket }) {
  const [loading, setLoading] = useState(false);

  const API_URL = "https://vikranth2704-2.onrender.com";

  // Load Razorpay script
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!name || !event) {
      alert("Please enter name and event");
      return;
    }

    setLoading(true);

    try {
      const loaded = await loadRazorpay();

      if (!loaded) {
        alert("Razorpay SDK failed to load");
        setLoading(false);
        return;
      }

      // Step 1: Create order
      const orderRes = await fetch(`${API_URL}/payment/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: 500 }),
      });

      if (!orderRes.ok) {
        throw new Error("Failed to create order");
      }

      const order = await orderRes.json();

      // Step 2: Razorpay options
      const options = {
        key: "rzp_test_xxxxxxxx", // 🔥 PUT YOUR RAZORPAY KEY HERE
        amount: order.amount,
        currency: "INR",
        name: "Event Booking",
        description: event,
        order_id: order.id,

        handler: async function (response) {
          try {
            // Step 3: Register user after payment
            const registerRes = await fetch(`${API_URL}/register`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                event,
                payment_id: response.razorpay_payment_id,
              }),
            });

            if (!registerRes.ok) {
              throw new Error("Registration failed");
            }

            const data = await registerRes.json();

            setTicket({
              name,
              event,
              qr: data.qrCode,
            });

          } catch (err) {
            console.error(err);
            alert("Registration failed");
          }

          setLoading(false);
        },

        prefill: {
          name: name,
        },

        theme: {
          color: "#3399cc",
        },
      };

      // Step 4: Open payment window
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error(error);
      alert("Payment failed");
      setLoading(false);
    }
  };

  return (
    <button onClick={handlePayment}>
      {loading ? "Processing..." : "Pay ₹500"}
    </button>
  );
}

export default Payment;
