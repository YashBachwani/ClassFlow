import React, { useState, useEffect, useRef } from "react";

export default function Assignments() {
  const KEY = "classflow_assignments";
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    extraInfo: "",
    marks: "",
    dueDate: "",
  });
  const [file, setFile] = useState(null);
  const dropRef = useRef();

  // Load stored assignments
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(KEY)) || [];
    setAssignments(stored);
  }, []);

  // Handle drag/drop events
  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
    dropRef.current.classList.remove("border-blue-500", "bg-blue-50");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    dropRef.current.classList.add("border-blue-500", "bg-blue-50");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dropRef.current.classList.remove("border-blue-500", "bg-blue-50");
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload the assignment file!");
      return;
    }

    const newA = {
      id: Date.now(),
      title: form.title,
      description: form.description || "No description provided.",
      extraInfo: form.extraInfo || "—",
      marks: form.marks,
      dueDate: form.dueDate,
      created: new Date().toLocaleString(),
      uploader: "John Doe (Faculty)",
      fileName: file.name,
      fileType: file.type,
      fileURL: URL.createObjectURL(file),
      status: "pending",
    };

    const updated = [newA, ...assignments];
    setAssignments(updated);
    localStorage.setItem(KEY, JSON.stringify(updated));

    // Reset form
    setForm({ title: "", description: "", extraInfo: "", marks: "", dueDate: "" });
    setFile(null);
  };

  return (
    <div className="p-6" data-aos="fade-up">
      <h2 className="text-xl font-bold text-green-700 mb-4">📝 Create Assignment</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Assignment Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border rounded p-2 w-full"
          required
        />

        <textarea
          placeholder="Assignment Description (optional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border rounded p-2 w-full"
        />

        <textarea
          placeholder="Other Information (optional)"
          value={form.extraInfo}
          onChange={(e) => setForm({ ...form, extraInfo: e.target.value })}
          className="border rounded p-2 w-full"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Marks"
            value={form.marks}
            onChange={(e) => setForm({ ...form, marks: e.target.value })}
            className="border rounded p-2 w-full"
            required
          />

          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            className="border rounded p-2 w-full"
            required
          />
        </div>

        {/* Drag & Drop Zone */}
        <div
          ref={dropRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition"
        >
          {file ? (
            <p className="text-green-600 font-medium">
              📎 {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          ) : (
            <>
              <p className="text-gray-600">Drag & drop the assignment file here</p>
              <p className="text-sm text-gray-400 mt-1">or click below to browse</p>
            </>
          )}
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".pdf,.ppt,.pptx,.png,.jpg,.jpeg"
            className="hidden"
            id="assignmentFile"
          />
          <label
            htmlFor="assignmentFile"
            className="inline-block mt-3 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 cursor-pointer"
          >
            Browse File
          </label>
        </div>

        {/* Preview before uploading */}
        {file && (
          <div className="bg-gray-50 p-4 rounded shadow mt-2">
            <h3 className="font-semibold text-gray-700 mb-2">File Preview:</h3>
            {file.type.includes("pdf") ? (
              <iframe
                src={URL.createObjectURL(file)}
                title="PDF Preview"
                className="w-full h-64 border rounded"
              />
            ) : file.type.includes("image") ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-48 h-auto rounded mx-auto"
              />
            ) : (
              <p className="text-gray-600">📑 {file.name} (Preview unavailable for this type)</p>
            )}
          </div>
        )}

        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded">
          Publish Assignment
        </button>
      </form>

      {/* Display existing assignments */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Previous Assignments</h3>
        {assignments.length === 0 ? (
          <p className="text-gray-500">No assignments yet.</p>
        ) : (
          <div className="space-y-3">
            {assignments.map((a) => (
              <div key={a.id} className="bg-white p-4 rounded shadow">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">{a.title}</p>
                    <p className="text-sm text-gray-500">
                      {a.uploader} • {a.created}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      a.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {a.status}
                  </span>
                </div>
                <p className="mt-2 text-gray-700">{a.description}</p>
                <p className="text-sm text-gray-500">
                  Marks: {a.marks} | Due: {a.dueDate}
                </p>
                {a.extraInfo && (
                  <p className="text-sm text-gray-600 mt-1">
                    💡 {a.extraInfo}
                  </p>
                )}
                <a
                  href={a.fileURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline mt-2 inline-block"
                >
                  View / Download {a.fileName}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
