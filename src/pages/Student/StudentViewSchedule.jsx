import React, { useEffect, useState } from "react";

export default function StudentViewSchedule() {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    setSchedule(JSON.parse(localStorage.getItem("schedule")) || []);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-green-700 mb-3">📅 Your Class Schedule</h2>
      {schedule.length === 0 ? (
        <p>No schedule available yet.</p>
      ) : (
        <ul>
          {schedule.map((s, i) => (
            <li key={i} className="border-b py-2 flex justify-between">
              <span>{s.subject} — {s.time}</span>
              {s.file && (
                <a
                  href={s.file}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline"
                >
                  View File
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
