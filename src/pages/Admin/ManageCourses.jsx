import React, { useEffect, useState } from "react";

const KEY = "classflow_courses";

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({ code: "", name: "", credits: "" });
  const [editingCode, setEditingCode] = useState(null);

  useEffect(() => {
    setCourses(JSON.parse(localStorage.getItem(KEY)) || []);
  }, []);

  const saveAll = (arr) => {
    setCourses(arr);
    localStorage.setItem(KEY, JSON.stringify(arr));
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.code || !form.name) return alert("Code & name required");
    if (editingCode) {
      const next = courses.map(c => c.code === editingCode ? { ...c, ...form } : c);
      saveAll(next);
      setEditingCode(null);
    } else {
      saveAll([ { ...form }, ...courses ]);
    }
    setForm({ code: "", name: "", credits: "" });
  };

  const edit = (c) => {
    setEditingCode(c.code);
    setForm({ code: c.code, name: c.name, credits: c.credits });
  };

  const remove = (code) => {
    if (!confirm("Delete course?")) return;
    const next = courses.filter(c => c.code !== code);
    saveAll(next);
  };

  return (
    <div data-aos="fade-up">
      <h2 className="text-xl font-semibold text-green-700 mb-4">Manage Courses</h2>

      <form onSubmit={submit} className="grid gap-2 sm:grid-cols-4 mb-4">
        <input name="code" value={form.code} onChange={handleChange} placeholder="Course code" className="px-3 py-2 border rounded" />
        <input name="name" value={form.name} onChange={handleChange} placeholder="Course name" className="px-3 py-2 border rounded" />
        <input name="credits" value={form.credits} onChange={handleChange} placeholder="Credits" className="px-3 py-2 border rounded" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">{editingCode ? "Update" : "Add Course"}</button>
      </form>

      <div className="bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Code</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Credits</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length === 0 && <tr><td colSpan="4" className="p-4 text-gray-500">No courses yet.</td></tr>}
            {courses.map(c => (
              <tr key={c.code} className="border-t">
                <td className="p-2">{c.code}</td>
                <td className="p-2">{c.name}</td>
                <td className="p-2">{c.credits}</td>
                <td className="p-2">
                  <button onClick={() => edit(c)} className="mr-2 text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => remove(c.code)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
