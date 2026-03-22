import { useState } from "react";
import Register from "./components/Register";
import Ticket from "./components/Ticket";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [ticket, setTicket] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="container">
      <h1>🎟️ Event Platform</h1>

      <div>
        <button onClick={() => setIsAdmin(false)}>User</button>
        <button onClick={() => setIsAdmin(true)}>Admin</button>
      </div>

      {isAdmin ? (
        <AdminDashboard />
      ) : !ticket ? (
        <Register setTicket={setTicket} />
      ) : (
        <Ticket ticket={ticket} />
      )}
    </div>
  );
}

export default App;