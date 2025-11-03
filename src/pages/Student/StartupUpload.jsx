import React, { useState } from "react";

export default function StartupUpload() {
  const [startup, setStartup] = useState({
    ideaTitle: "",
    description: "",
    file: "",
  });

  const handleChange = (e) => {
    setStartup({ ...startup, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setStartup({ ...startup, file: url });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stored = JSON.parse(localStorage.getItem("studentStartups")) || [];
    const newEntry = { ...startup, date: new Date().toLocaleString() };
    localStorage.setItem("studentStartups", JSON.stringify([...stored, newEntry]));

    setStartup({ ideaTitle: "", description: "", file: "" });
    alert("Startup idea uploaded successfully!");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">🚀 Startup Idea Submission</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-4 rounded space-y-4"
      >
        <div>
          <label className="block font-medium mb-1">Startup Title</label>
          <input
            type="text"
            name="ideaTitle"
            value={startup.ideaTitle}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            placeholder="Enter your startup idea title"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={startup.description}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            rows="4"
            placeholder="Describe your startup idea..."
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1">Upload Pitch Deck (PDF/PPT)</label>
          <input type="file" accept=".pdf,.ppt,.pptx" onChange={handleFile} required />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
