import React, { useState, useEffect } from "react";

export default function QuizTest() {
  const [quizzes, setQuizzes] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    duration: "",
    file: null,
    fileName: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  // Load quizzes from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("quizzes")) || [];
    setQuizzes(stored);

    const handleStorage = (e) => {
      if (e.key === "quizzes") {
        setQuizzes(JSON.parse(e.newValue) || []);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Save to localStorage
  const saveToStorage = (updated) => {
    localStorage.setItem("quizzes", JSON.stringify(updated));
    setQuizzes(updated);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowed = ["application/pdf", "application/vnd.ms-powerpoint", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "image/jpeg", "image/png", "image/jpg"];
    if (!allowed.includes(file.type)) {
      alert("Only PDF, PPT, PPTX, JPG, or PNG files are allowed!");
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

  // Add or update quiz
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.duration) return;

    const newQuiz = {
      ...form,
      id: editIndex !== null ? quizzes[editIndex].id : Date.now(),
      createdAt: new Date().toLocaleString(),
    };

    let updated;
    if (editIndex !== null) {
      updated = [...quizzes];
      updated[editIndex] = newQuiz;
      setEditIndex(null);
    } else {
      updated = [...quizzes, newQuiz];
    }

    saveToStorage(updated);
    setForm({
      title: "",
      description: "",
      date: "",
      duration: "",
      file: null,
      fileName: "",
    });
  };

  // Edit quiz
  const handleEdit = (index) => {
    setForm(quizzes[index]);
    setEditIndex(index);
  };

  // Delete quiz
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this quiz/test?")) {
      const updated = quizzes.filter((_, i) => i !== index);
      saveToStorage(updated);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-green-700 mb-5">
        📊 Quiz & Test Management
      </h2>

      {/* Add/Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6"
      >
        <input
          type="text"
          name="title"
          placeholder="Quiz/Test Title"
          value={form.title}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />
        <input
          type="number"
          name="duration"
          placeholder="Duration (minutes)"
          value={form.duration}
          onChange={handleChange}
          className="border rounded p-2"
          required
        />
        <textarea
          name="description"
          placeholder="Short Description"
          value={form.description}
          onChange={handleChange}
          className="border rounded p-2 sm:col-span-2"
          rows="2"
        />

        {/* File Upload */}
        <div className="sm:col-span-2 flex flex-col gap-2">
          <label className="font-medium text-gray-700">
            📎 Attach File (PDF / PPT / Image)
          </label>
          <input
            type="file"
            accept=".pdf,.ppt,.pptx,.jpg,.jpeg,.png"
            onChange={handleFileUpload}
            className="border rounded p-2"
          />
          {form.file && (
            <div className="flex items-center gap-2 text-sm bg-gray-100 border p-2 rounded">
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
          className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded sm:col-span-2"
        >
          {editIndex !== null ? "Update Quiz/Test" : "Add Quiz/Test"}
        </button>
      </form>

      {/* Quiz List */}
      {quizzes.length === 0 ? (
        <p className="text-gray-500">No quizzes or tests available yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-green-100">
              <tr>
                <th className="px-3 py-2 border">Title</th>
                <th className="px-3 py-2 border">Date</th>
                <th className="px-3 py-2 border">Duration</th>
                <th className="px-3 py-2 border">Attachment</th>
                <th className="px-3 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map((q, i) => (
                <tr key={q.id} className="hover:bg-gray-50 text-center">
                  <td className="border px-3 py-2 font-medium">{q.title}</td>
                  <td className="border px-3 py-2">{q.date}</td>
                  <td className="border px-3 py-2">{q.duration} mins</td>
                  <td className="border px-3 py-2">
                    {q.file ? (
                      <a
                        href={q.file}
                        download={q.fileName}
                        className="text-blue-600 underline"
                      >
                        {q.fileName}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="border px-3 py-2 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(i)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(i)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
