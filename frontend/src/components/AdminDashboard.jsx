import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

ChartJS.register(BarElement, CategoryScale, LinearScale);

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://event-ticket-generaion-web-portal.onrender.com";

  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => {
        console.error(err);
        alert("Error fetching users");
      })
      .finally(() => setLoading(false));
  }, []);

  // 📊 Chart Data (safe)
  const eventCounts = {};
  users.forEach((u) => {
    if (u.event) {
      eventCounts[u.event] = (eventCounts[u.event] || 0) + 1;
    }
  });

  const chartData = {
    labels: Object.keys(eventCounts),
    datasets: [
      {
        label: "Registrations",
        data: Object.values(eventCounts),
      },
    ],
  };

  // 📁 Export Excel (formatted)
  const exportToExcel = () => {
    const formattedData = users.map((u) => ({
      Name: u.name,
      Event: u.event,
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");

    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const file = new Blob([buf], { type: "application/octet-stream" });

    saveAs(file, "event_users.xlsx");
  };

  return (
    <div>
      <h2>📊 Admin Dashboard</h2>

      <button onClick={exportToExcel}>📁 Export Excel</button>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <>
          <div style={{ width: "400px", margin: "auto" }}>
            <Bar data={chartData} />
          </div>

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
          </table>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;
