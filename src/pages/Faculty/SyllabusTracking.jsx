import React, { useState, useEffect } from "react";

export default function SyllabusTracking() {
  const [topics, setTopics] = useState([]);
  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState("Partial");
  const [remaining, setRemaining] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  const KEY = "syllabus";

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(KEY)) || [];
    setTopics(stored);
  }, []);

  const saveToStorage = (data) => {
    setTopics(data);
    localStorage.setItem(KEY, JSON.stringify(data));
  };

  // Add new topic row
  const addTopic = (e) => {
    e.preventDefault();
    const newEntry = {
      day: topics.length + 1,
      topic,
      status,
      remaining: status === "Partial" ? remaining : "",
    };
    const updated = [...topics, newEntry];
    saveToStorage(updated);
    setTopic("");
    setRemaining("");
    setStatus("Partial");
  };

  // Update a topic row
  const updateTopic = (index, field, value) => {
    const updated = [...topics];
    updated[index][field] = value;
    saveToStorage(updated);
  };

  // Delete topic row
  const deleteTopic = (index) => {
    const updated = topics.filter((_, i) => i !== index);
    // Renumber days after delete
    updated.forEach((t, i) => (t.day = i + 1));
    saveToStorage(updated);
  };

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
          📘 Syllabus Tracking
        </h2>

        {/* Add Topic Form */}
        <form
          onSubmit={addTopic}
          className="flex flex-col md:flex-row gap-3 mb-6 items-center"
        >
          <input
            type="text"
            placeholder="Enter Topic Name"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="border rounded-lg p-2 w-full md:w-1/3 focus:ring-2 focus:ring-green-400"
            required
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded-lg p-2 w-full md:w-1/4 focus:ring-2 focus:ring-green-400"
          >
            <option>Partial</option>
            <option>Fully Covered</option>
          </select>

          {status === "Partial" && (
            <input
              type="text"
              placeholder="Remaining topics (optional)"
              value={remaining}
              onChange={(e) => setRemaining(e.target.value)}
              className="border rounded-lg p-2 w-full md:w-1/3 focus:ring-2 focus:ring-green-400"
            />
          )}

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </form>

        {/* Table */}
        <div className="overflow-x-auto">
          {topics.length === 0 ? (
            <p className="text-gray-500 text-center">
              No syllabus added yet. Start adding your topics above.
            </p>
          ) : (
            <table className="min-w-full border rounded-lg shadow-sm">
              <thead className="bg-green-100">
                <tr>
                  <th className="py-2 px-3 border text-left">Lecture</th>
                  <th className="py-2 px-3 border text-left">Topic</th>
                  <th className="py-2 px-3 border text-left">Status</th>
                  <th className="py-2 px-3 border text-left">Remaining Topics</th>
                  <th className="py-2 px-3 border text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {topics.map((t, i) => (
                  <tr key={i} className="border-b hover:bg-green-50">
                    <td className="py-2 px-3 border text-gray-700">{t.day}</td>
                    <td className="py-2 px-3 border">
                      {editingIndex === i ? (
                        <input
                          type="text"
                          value={t.topic}
                          onChange={(e) =>
                            updateTopic(i, "topic", e.target.value)
                          }
                          className="border rounded p-1 w-full"
                        />
                      ) : (
                        t.topic
                      )}
                    </td>
                    <td className="py-2 px-3 border">
                      <select
                        value={t.status}
                        onChange={(e) => updateTopic(i, "status", e.target.value)}
                        className={`border rounded p-1 ${
                          t.status === "Fully Covered"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        <option>Partial</option>
                        <option>Fully Covered</option>
                      </select>
                    </td>
                    <td className="py-2 px-3 border">
                      {t.status === "Partial" ? (
                        <input
                          type="text"
                          value={t.remaining}
                          onChange={(e) =>
                            updateTopic(i, "remaining", e.target.value)
                          }
                          placeholder="Remaining topics..."
                          className="border rounded p-1 w-full"
                        />
                      ) : (
                        <span className="text-gray-400 italic">—</span>
                      )}
                    </td>
                    <td className="py-2 px-3 border text-center">
                      {editingIndex === i ? (
                        <button
                          onClick={() => setEditingIndex(null)}
                          className="text-green-600 hover:underline"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditingIndex(i)}
                          className="text-blue-600 hover:underline mr-3"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => deleteTopic(i)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Update All Button */}
        {topics.length > 0 && (
          <div className="text-right mt-4">
            <button
              onClick={() => saveToStorage([...topics])}
              className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow"
            >
              Update Sheet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
