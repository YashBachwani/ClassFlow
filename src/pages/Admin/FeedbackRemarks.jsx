import React, { useEffect, useState } from "react";

const KEY = "classflow_feedbacks";

export default function FeedbackRemarks() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(KEY)) || [];
    setFeedbacks(saved);
  }, []);

  // This page is read-only for admin; show sentiment-like summary (simple)
  const positive = feedbacks.filter(f => f.sentiment === "positive").length;
  const negative = feedbacks.filter(f => f.sentiment === "negative").length;
  const neutral = feedbacks.filter(f => f.sentiment === "neutral").length;
  const total = feedbacks.length;

  return (
    <div data-aos="fade-up">
      <h2 className="text-xl font-semibold text-green-700 mb-4">Feedback Remarks</h2>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded-md shadow">
          <p className="text-sm text-gray-500">Total feedbacks</p>
          <p className="text-2xl font-bold">{total}</p>
        </div>
        <div className="p-4 bg-white rounded-md shadow">
          <p className="text-sm text-gray-500">Positive</p>
          <p className="text-2xl font-bold text-green-600">{positive}</p>
        </div>
        <div className="p-4 bg-white rounded-md shadow">
          <p className="text-sm text-gray-500">Negative</p>
          <p className="text-2xl font-bold text-red-500">{negative}</p>
        </div>
      </div>

      <div className="space-y-3">
        {feedbacks.length === 0 && <p className="text-gray-500">No feedbacks yet.</p>}
        {feedbacks.map((f) => (
          <div key={f.id} className="bg-white p-4 rounded-md shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">{f.title || "Feedback"}</p>
                <p className="text-sm text-gray-500">{new Date(f.date).toLocaleString()}</p>
              </div>
              <span className={`px-2 py-1 rounded text-sm ${f.sentiment === "positive" ? "bg-green-100 text-green-700" : f.sentiment === "negative" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}>
                {f.sentiment || "neutral"}
              </span>
            </div>
            <p className="mt-2 text-gray-700">{f.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
