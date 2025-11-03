import React, { useEffect, useState } from "react";

const KEY = "classflow_startups";

export default function StartupReview() {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    setIdeas(JSON.parse(localStorage.getItem(KEY)) || []);
  }, []);

  const toggleApprove = (id) => {
    const next = ideas.map(i => i.id === id ? { ...i, approved: !i.approved } : i);
    setIdeas(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  return (
    <div data-aos="fade-up">
      <h2 className="text-xl font-semibold text-green-700 mb-4">Startup Idea Review</h2>

      {ideas.length === 0 && <p className="text-gray-500">No startup ideas submitted yet.</p>}

      <div className="space-y-3">
        {ideas.map(i => (
          <div key={i.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between">
              <div>
                <p className="font-semibold text-gray-800">{i.title}</p>
                <p className="text-sm text-gray-500">{i.uploader} — {new Date(i.date).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleApprove(i.id)} className={`px-3 py-1 rounded ${i.approved ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700"}`}>
                  {i.approved ? "Approved" : "Approve"}
                </button>
              </div>
            </div>
            <p className="mt-2 text-gray-700">{i.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
