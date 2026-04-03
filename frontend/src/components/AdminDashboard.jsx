import { useEffect, useState } from "react";
import API_URL from "../api";

function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/register`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(console.error);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Admin Dashboard</h2>

      <table border="1" style={{ margin: "auto" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Event</th>
            <th>Payment ID</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td>{u.name}</td>
              <td>{u.event}</td>
              <td>{u.payment_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
