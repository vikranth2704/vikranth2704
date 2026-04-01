function Ticket({ ticket }) {
  return (
    <div className="ticket">
      <h2>✅ Registration Successful</h2>
      <p>Name: {ticket.name}</p>
      <p>Event: {ticket.event}</p>
      <img src={ticket.qr} alt="QR Code" />
    </div>
  );
}

export default Ticket;
