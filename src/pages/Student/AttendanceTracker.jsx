import React, { useEffect, useState } from "react";

export default function AttendanceTracker() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords(JSON.parse(localStorage.getItem("attendanceRecords")) || []);
  }, []);

  const total = records.length;
  const present = records.filter((r) => r.status === "Present").length;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-green-700 mb-3">📅 Attendance Tracker</h2>
      <p className="mb-3">Attendance: {present}/{total} classes attended</p>
      {records.map((r, i) => (
        <div key={i} className="border-b py-2">
          {r.date} — <strong>{r.status}</strong>
        </div>
      ))}
    </div>
  );
}
