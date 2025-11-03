import React, { useState, useEffect } from "react";

export default function FacultyAnnouncements() {
  const KEY = "announcements";
  const [announcements, setAnnouncements] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    file: null,
    fileName: "",
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(KEY)) || [];
    setAnnouncements(stored);

    const syncHandler = (e) => {
      if (e.key === KEY) {
        setAnnouncements(JSON.parse(e.newValue) || []);
      }
    };
    window.addEventListener("storage", syncHandler);
    return () => window.removeEventListener("storage", syncHandler);
  }, []);

  const saveToStorage = (updated) => {
    localStorage.setItem(KEY, JSON.stringify(updated));
    setAnnouncements(updated);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowed = [
      "application/pdf",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowed.includes(file.type)) {
      alert("Only PDF, PPT, DOC, or Image files are allowed!");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setForm({
        ...form,
        file: reader.result,
        fileName: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const newAnnouncement = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      date: new Date().toLocaleString(),
      by: "John Doe (Faculty)",
      file: form.file,
      fileName: form.fileName,
    };

    const updated = [newAnnouncement, ...announcements];
    saveToStorage(updated);

    setForm({
      title: "",
      description: "",
      file: null,
      fileName: "",
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      const updated = announcements.filter((a) => a.id !== id);
      saveToStorage(updated);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg" data-aos="fade-up">
      <h2 className="text-2xl font-semibold text-green-700 mb-5 flex items-center gap-2">
        📢 Faculty Announcements
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
      >
        <input
          type="text"
          name="title"
          placeholder="Announcement Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border rounded p-2 sm:col-span-2"
          required
        />

        <textarea
          name="description"
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="border rounded p-2 sm:col-span-2"
          rows="3"
        />

        <div className="sm:col-span-2">
          <label className="font-medium text-gray-700">
            📎 Attach File (optional)
          </label>
          <input
            type="file"
            accept=".pdf,.ppt,.pptx,.jpg,.jpeg,.png,.doc,.docx"
            onChange={handleFileUpload}
            className="border rounded w-full p-2 mt-1"
          />
          {form.file && (
            <div className="flex items-center gap-2 mt-2 bg-gray-100 border p-2 rounded text-sm">
              <span>📄 {form.fileName}</span>
              <a
                href={form.file}
                download={form.fileName}
                className="text-blue-600 underline"
              >
                Download
              </a>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white py-2 rounded sm:col-span-2 font-medium"
        >
          Post Announcement
        </button>
      </form>

      {/* Announcement List */}
      {announcements.length === 0 ? (
        <p className="text-gray-500">No announcements yet.</p>
      ) : (
        <div className="space-y-4">
          {announcements.map((a) => (
            <div
              key={a.id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {a.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Posted by {a.by} • {a.date}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(a.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  ✕
                </button>
              </div>

              {a.description && (
                <p className="mt-2 text-gray-700">{a.description}</p>
              )}

              {a.file && (
                <div className="mt-3">
                  <a
                    href={a.file}
                    download={a.fileName}
                    className="text-blue-600 underline text-sm"
                  >
                    📎 {a.fileName}
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
