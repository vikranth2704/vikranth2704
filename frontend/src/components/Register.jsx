import { useState } from "react";

function Register({ setTicket }) {
  const [name, setName] = useState("");
  const [event, setEvent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, event }),
    });

    const data = await res.json();

    setTicket({
      name,
      event,
      qr: data.qrCode,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Enter Event"
        value={event}
        onChange={(e) => setEvent(e.target.value)}
      />
      <button>Register</button>
    </form>
  );
}

export default Register;