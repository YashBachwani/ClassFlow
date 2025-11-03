import React, { useEffect, useState } from "react";

export default function SyllabusProgress() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    setTopics(JSON.parse(localStorage.getItem("syllabus")) || []);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-green-700 mb-3">📖 Syllabus Progress</h2>
      {topics.length === 0 ? (
        <p>No syllabus data yet.</p>
      ) : (
        <table className="min-w-full border text-left">
          <thead>
            <tr>
              <th className="border p-2">Day</th>
              <th className="border p-2">Topic</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {topics.map((t, i) => (
              <tr key={i}>
                <td className="border p-2">{i + 1}</td>
                <td className="border p-2">{t.topic}</td>
                <td className="border p-2">{t.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
