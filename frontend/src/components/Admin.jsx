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

function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://vikranth2704-2.onrender.com";

  // Fetch users
  useEffect(() => {
    fetch(`${API_URL}/users`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => {
        console.error(err);
        alert("Error fetching users");
      })
      .finally(() => setLoading(false));
  }, []);

  // Chart data
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

  // Export Excel
  const exportToExcel = () => {
    const formatted = users.map((u) => ({
      Name: u.name,
      Event: u.event,
    }));

    const ws = XLSX.utils.json_to_sheet(formatted);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");

    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const file = new Blob([buf], { type: "application/octet-stream" });

    saveAs(file, "event_users.xlsx");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>📊 Admin Dashboard</h1>

      <button onClick={exportToExcel}>
        📁 Export Excel
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Chart */}
          <div style={{ width: "400px", margin: "20px auto" }}>
            <Bar data={chartData} />
          </div>

          {/* Table */}
          <table border="1" style={{ margin: "20px auto" }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Event</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id || u.payment
