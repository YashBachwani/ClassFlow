import React, { useState } from "react";

export default function StudentFeedback() {
  const [feedback, setFeedback] = useState({
    teachingClarity: "",
    understanding: "",
    engagement: "",
    suggestions: "",
  });

  const handleChange = (e) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const stored = JSON.parse(localStorage.getItem("studentFeedbacks")) || [];

    const newFeedback = {
      ...feedback,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem("studentFeedbacks", JSON.stringify([...stored, newFeedback]));

    setFeedback({
      teachingClarity: "",
      understanding: "",
      engagement: "",
      suggestions: "",
    });

    alert("Feedback submitted anonymously!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">💬 Anonymous Feedback Form</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-4 rounded space-y-4"
      >
        <div>
          <label className="block font-medium mb-1">
            1️⃣ How clear was the teaching?
          </label>
          <select
            name="teachingClarity"
            value={feedback.teachingClarity}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          >
            <option value="">Select</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Poor">Poor</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">
            2️⃣ How well did you understand the concepts?
          </label>
          <select
            name="understanding"
            value={feedback.understanding}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          >
            <option value="">Select</option>
            <option value="Very Good">Very Good</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">
            3️⃣ How engaging were the lectures?
          </label>
          <select
            name="engagement"
            value={feedback.engagement}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          >
            <option value="">Select</option>
            <option value="Very Engaging">Very Engaging</option>
            <option value="Engaging">Engaging</option>
            <option value="Neutral">Neutral</option>
            <option value="Boring">Boring</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">4️⃣ Any suggestions or feedback?</label>
          <textarea
            name="suggestions"
            value={feedback.suggestions}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            placeholder="Write here..."
            rows="3"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
