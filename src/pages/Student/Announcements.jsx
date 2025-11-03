import React, { useEffect, useState } from "react";

export default function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    setAnnouncements(JSON.parse(localStorage.getItem("facultyAnnouncements")) || []);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-green-700 mb-3">🔔 Announcements</h2>
      {announcements.length === 0 ? (
        <p>No announcements yet.</p>
      ) : (
        announcements.map((a, i) => (
          <div key={i} className="border-b py-2">
            <strong>{a.message}</strong>
            <p className="text-sm text-gray-500">{a.date}</p>
          </div>
        ))
      )}
    </div>
  );
}
