import React, { useEffect, useState } from "react";

/**
 * Similar to student assessment but for teacher-submitted items.
 * Uses localStorage key 'classflow_teacher_uploads'
 */

export default function AssessmentTeachers() {
  const KEY = "classflow_teacher_uploads";
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem(KEY)) || []);
  }, []);

  const approve = (id) => {
    const next = items.map(i => i.id === id ? { ...i, status: "approved" } : i);
    setItems(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  return (
    <div data-aos="fade-up">
      <h2 className="text-xl font-semibold text-green-700 mb-4">Assess Teacher Uploads</h2>
      {items.length === 0 && <p className="text-gray-500">No teacher uploads yet.</p>}
      <div className="space-y-3">
        {items.map(it => (
          <div key={it.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800">{it.title}</p>
                <p className="text-sm text-gray-500">{it.uploader} • {new Date(it.date).toLocaleString()}</p>
              </div>
              <div>
                <span className={`px-2 py-1 rounded text-sm ${it.status === "approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {it.status || "pending"}
                </span>
                {it.status !== "approved" && <button onClick={() => approve(it.id)} className="ml-2 text-green-600 hover:underline">Approve</button>}
              </div>
            </div>
            <p className="mt-2 text-gray-700">{it.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
