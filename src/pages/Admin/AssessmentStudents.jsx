import React, { useEffect, useState } from "react";

/**
 * Allows admin to view uploaded student submissions (mock).
 * Uses localStorage key 'classflow_student_uploads'.
 */

const KEY = "classflow_student_uploads";

export default function AssessmentStudents() {
  const [uploads, setUploads] = useState([]);

  useEffect(() => {
    setUploads(JSON.parse(localStorage.getItem(KEY)) || []);
  }, []);

  const markReviewed = (id) => {
    const next = uploads.map(u => u.id === id ? { ...u, reviewed: true } : u);
    setUploads(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  return (
    <div data-aos="fade-up">
      <h2 className="text-xl font-semibold text-green-700 mb-4">Assess Student Uploads</h2>

      {uploads.length === 0 && <p className="text-gray-500">No student uploads yet.</p>}

      <div className="space-y-3">
        {uploads.map(u => (
          <div key={u.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800">{u.title}</p>
                <p className="text-sm text-gray-500">{u.uploader} — {new Date(u.date).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-sm ${u.reviewed ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {u.reviewed ? "Reviewed" : "Pending"}
                </span>
                {!u.reviewed && <button onClick={() => markReviewed(u.id)} className="text-green-600 hover:underline">Mark Reviewed</button>}
              </div>
            </div>
            <p className="mt-2 text-gray-700">{u.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
