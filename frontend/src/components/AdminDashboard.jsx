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

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  // 📊 Chart Data
  const eventCounts = {};
  users.forEach((u) => {
    eventCounts[u.event] = (eventCounts[u.event] || 0) + 1;
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

  // 📁 Export Excel
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(users);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");

    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const file = new Blob([buf], { type: "application/octet-stream" });

    saveAs(file, "users.xlsx");
  };

  return (
    <div>
      <h2>📊 Admin Dashboard</h2>

      <button onClick={exportToExcel}>📁 Export Excel</button>

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
          {users.map((u, i) => (
            <tr key={i}>
              <td>{u.name}</td>
              <td>{u.event}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;