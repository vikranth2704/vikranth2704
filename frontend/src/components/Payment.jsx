import { useState } from "react";

function Payment({ name, event, setTicket }) {
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    const res = await loadRazorpay();

    if (!res) {
      alert("Razorpay SDK failed");
      return;
    }

    // Create order from backend
    const orderRes = await fetch("https://vikranth2704.onrender.com/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 500 }),
    });

    const order = await orderRes.json();

    const options = {
      key: "YOUR_KEY_ID",
      amount: order.amount,
      currency: "INR",
      name: "Event Booking",
      description: event,
      order_id: order.id,

      handler: async function (response) {
        // After payment success → register user
        const registerRes = await fetch("https://vikranth2704.onrender.com/payment/register", {
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

        const data = await registerRes.json();

        setTicket({
          name,
          event,
          qr: data.qrCode,
        });
      },

      prefill: {
        name: name,
      },

      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    setLoading(false);
  };

  return (
    <button onClick={handlePayment}>
      {loading ? "Processing..." : "Pay ₹500"}
    </button>
  );
}

export default Payment;
