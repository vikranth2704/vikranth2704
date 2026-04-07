import { useEffect, useState } from "react";
import React from "react";

function Admin() {
  const [users, setUsers] = useState([]);

  const API_URL = "https://vikranth2704-2.onrender.com";

  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => alert("Error fetching users"));
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Admin Dashboard</h1>

      <table border="1" style={{ margin: "20px auto" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Event</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id || u.payment_id}>
              <td>{u.name}</td>
              <td>{u.event}</td>
            </tr>
          ))}
        </tbody>
