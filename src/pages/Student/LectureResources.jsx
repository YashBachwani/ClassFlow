import React, { useEffect, useState } from "react";

export default function LectureResources() {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    setResources(JSON.parse(localStorage.getItem("lectureResources")) || []);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-green-700 mb-3">📘 Lecture Notes & Resources</h2>
      {resources.length === 0 ? (
        <p>No lecture materials available yet.</p>
      ) : (
        <ul>
          {resources.map((r, i) => (
            <li key={i} className="border-b py-2 flex justify-between">
              <span>{r.title}</span>
              <a
                href={r.file}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline"
              >
                View
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
