import React, { useEffect, useState } from "react";

export default function MaterialsDownload() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const quizFiles = JSON.parse(localStorage.getItem("facultyQuizData")) || [];
    const lectureFiles = JSON.parse(localStorage.getItem("lectureResources")) || [];
    const scheduleFiles = JSON.parse(localStorage.getItem("schedule")) || [];

    // Combine all file resources
    const allFiles = [...quizFiles, ...lectureFiles, ...scheduleFiles].filter(
      (f) => f.file
    );

    setMaterials(allFiles);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">📂 Download Materials</h2>
      {materials.length === 0 ? (
        <p>No materials available yet.</p>
      ) : (
        <ul>
          {materials.map((m, i) => (
            <li key={i} className="border-b py-2 flex justify-between">
              <span>{m.title || m.subject || "Material"}</span>
              <a
                href={m.file}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                Download
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
