import { useState } from "react";
import Register from "./components/Register";
import Admin from "./components/Admin";

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Event Platform</h1>

      <button onClick={() => setIsAdmin(false)}>User</button>
      <button onClick={() => setIsAdmin(true)}>Admin</button>

      <hr />

      {isAdmin ? <Admin /> : <Register />}
    </div>
  );
}

export default App;
