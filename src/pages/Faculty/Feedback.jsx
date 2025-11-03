import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [msg, setMsg] = useState("");
  const totalStudents = 30; // example — total number of students in the class

  // Load stored feedbacks
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("facultyFeedbacks")) || [];
    setFeedbacks(stored);
  }, []);

  // Basic sentiment analysis (mock logic)
  const getSentiment = (text) => {
    const positiveWords = ["good", "great", "amazing", "excellent", "nice", "love"];
    const negativeWords = ["bad", "poor", "boring", "worst", "hate", "slow"];
    const lower = text.toLowerCase();
    let score = 0;
    positiveWords.forEach((w) => (lower.includes(w) ? (score += 1) : null));
    negativeWords.forEach((w) => (lower.includes(w) ? (score -= 1) : null));

    if (score > 0) return "Positive";
    else if (score < 0) return "Negative";
    else return "Neutral";
  };

  const addFeedback = (e) => {
    e.preventDefault();
    const newFeedback = {
      msg,
      date: new Date().toLocaleString(),
      sentiment: getSentiment(msg),
    };
    const updated = [...feedbacks, newFeedback];
    setFeedbacks(updated);
    localStorage.setItem("facultyFeedbacks", JSON.stringify(updated));
    setMsg("");
  };

  // Count sentiments
  const sentimentCount = {
    Positive: feedbacks.filter((f) => f.sentiment === "Positive").length,
    Neutral: feedbacks.filter((f) => f.sentiment === "Neutral").length,
    Negative: feedbacks.filter((f) => f.sentiment === "Negative").length,
  };

  const pieData = [
    { name: "Positive", value: sentimentCount.Positive },
    { name: "Neutral", value: sentimentCount.Neutral },
    { name: "Negative", value: sentimentCount.Negative },
  ];

  const COLORS = ["#16a34a", "#eab308", "#dc2626"];

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-green-700 mb-4">💬 Student Feedback Dashboard</h2>

      {/* Feedback Stats */}
      <p className="text-gray-600 mb-2">
        📊 Feedback received: <b>{feedbacks.length}</b> / {totalStudents} students
      </p>

      {/* Form for faculty testing (simulating student feedback entry) */}
      <form onSubmit={addFeedback} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter feedback (anonymously)"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="border rounded p-2 w-3/4 focus:outline-none"
          required
        />
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 rounded">
          Submit
        </button>
      </form>

      {/* Pie Chart */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-6">
        <PieChart width={300} height={250}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>

        <div className="text-sm text-gray-700">
          <p><b>Positive:</b> {sentimentCount.Positive}</p>
          <p><b>Neutral:</b> {sentimentCount.Neutral}</p>
          <p><b>Negative:</b> {sentimentCount.Negative}</p>
        </div>
      </div>

      {/* Feedback List */}
      <div>
        <h3 className="text-lg font-semibold mb-2 text-green-700">📜 Anonymous Feedbacks</h3>
        {feedbacks.length === 0 ? (
          <p className="text-gray-500">No feedbacks yet.</p>
        ) : (
          feedbacks
            .slice()
            .reverse()
            .map((f, i) => (
              <div
                key={i}
                className={`border-l-4 p-3 mb-2 rounded ${
                  f.sentiment === "Positive"
                    ? "border-green-600 bg-green-50"
                    : f.sentiment === "Negative"
                    ? "border-red-600 bg-red-50"
                    : "border-yellow-500 bg-yellow-50"
                }`}
              >
                <p className="text-gray-800 italic">"{f.msg}"</p>
                <small className="text-gray-500 block">
                  Sentiment: <b>{f.sentiment}</b> | {f.date}
                </small>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
