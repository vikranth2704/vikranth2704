import { useState } from "react";

function Register({ setTicket }) {
  const [name, setName] = useState("");
  const [event, setEvent] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "https://vikranth2704.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !event) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          event,
          payment_id: "TEST123",
        }),
      });

      if (!res.ok) throw new Error("Failed");

      const data = await res.json();

      setTicket({
        name,
        event,
        qr: data.qrCode,
      });

    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter Event"
        value={event}
        onChange={(e) => setEvent(e.target.value)}
      />

      <button type="submit">
        {loading ? "Processing..." : "Register"}
      </button>
    </form>
  );
}

export default Register;
