import React, { useState, useEffect, useRef } from "react";

export default function MaterialUpload() {
  const KEY = "classflow_teacher_materials";
  const [uploads, setUploads] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [file, setFile] = useState(null);
  const dropRef = useRef();

  // Load existing uploads
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(KEY)) || [];
    setUploads(saved);
  }, []);

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile && (uploadedFile.type.includes("pdf") || uploadedFile.name.endsWith(".ppt") || uploadedFile.name.endsWith(".pptx"))) {
      setFile(uploadedFile);
    } else {
      alert("Please upload only PDF or PPT files.");
    }
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

  // Handle upload
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a PDF or PPT file first!");
      return;
    }

    const newItem = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      uploader: "John Doe (Faculty)", // dynamically change in real setup
      date: new Date().toISOString(),
      fileName: file.name,
      fileType: file.type,
      fileURL: URL.createObjectURL(file),
      status: "pending",
    };

    const next = [newItem, ...uploads];
    setUploads(next);
    localStorage.setItem(KEY, JSON.stringify(next));

    // Reset form
    setForm({ title: "", description: "" });
    setFile(null);
  };

  return (
    <div data-aos="fade-up" className="p-6">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">Faculty Material Uploads</h2>

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Enter material title"
          className="border rounded w-full p-2"
          required
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Enter description"
          className="border rounded w-full p-2"
          required
        />

        {/* Drag and Drop Zone */}
        <div
          ref={dropRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors"
        >
          {file ? (
            <p className="text-green-600 font-medium">
              📎 {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          ) : (
            <>
              <p className="text-gray-600">Drag & drop your PDF or PPT here</p>
              <p className="text-sm text-gray-400 mt-1">or click to browse</p>
            </>
          )}
          <input
            type="file"
            accept=".pdf,.ppt,.pptx"
            onChange={(e) => setFile(e.target.files[0])}
            className="hidden"
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            className="inline-block mt-3 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 cursor-pointer"
          >
            Browse File
          </label>
        </div>

        {/* Preview before Upload */}
        {file && (
          <div className="bg-gray-50 p-4 rounded shadow mt-2">
            <h3 className="font-semibold text-gray-700 mb-2">Preview:</h3>
            {file.type === "application/pdf" ? (
              <iframe
                src={URL.createObjectURL(file)}
                title="PDF Preview"
                className="w-full h-64 border rounded"
              />
            ) : (
              <p className="text-gray-600">
                📑 {file.name} (Preview not available for PPT files)
              </p>
            )}
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Upload Material
        </button>
      </form>

      {/* Previous Uploads */}
      <div className="mt-8 space-y-3">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Previous Uploads</h3>
        {uploads.length === 0 ? (
          <p className="text-gray-500">No materials uploaded yet.</p>
        ) : (
          uploads.map((it) => (
            <div key={it.id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-800">{it.title}</p>
                  <p className="text-sm text-gray-500">
                    {it.uploader} • {new Date(it.date).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 rounded text-sm ${
                    it.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {it.status}
                </span>
              </div>
              <p className="mt-2 text-gray-700">{it.description}</p>
              <a
                href={it.fileURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                View / Download {it.fileName}
              </a>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
