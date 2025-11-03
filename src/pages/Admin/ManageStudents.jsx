import React, { useEffect, useState } from "react";

const KEY = "classflow_students";

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", email: "", course: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(KEY)) || [];
    setStudents(saved);
  }, []);

  const saveAll = (arr) => {
    setStudents(arr);
    localStorage.setItem(KEY, JSON.stringify(arr));
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const addStudent = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return alert("Name & email required");
    if (editingId) {
      const next = students.map(s => s.id === editingId ? { ...s, ...form } : s);
      saveAll(next);
      setEditingId(null);
    } else {
      const newS = { ...form, id: Date.now().toString() };
      saveAll([newS, ...students]);
    }
    setForm({ id: "", name: "", email: "", course: "" });
  };

  const edit = (s) => {
    setEditingId(s.id);
    setForm({ id: s.id, name: s.name, email: s.email, course: s.course });
  };

  const remove = (id) => {
    if (!confirm("Delete student?")) return;
    const next = students.filter(s => s.id !== id);
    saveAll(next);
  };

  return (
    <div data-aos="fade-up">
      <h2 className="text-xl font-semibold text-green-700 mb-4">Manage Students</h2>

      <form onSubmit={addStudent} className="grid gap-2 sm:grid-cols-4 mb-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" className="px-3 py-2 border rounded" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="px-3 py-2 border rounded" />
        <input name="course" value={form.course} onChange={handleChange} placeholder="Course" className="px-3 py-2 border rounded" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">{editingId ? "Update" : "Add Student"}</button>
      </form>

      <div className="bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Course</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 && <tr><td className="p-4 text-gray-500" colSpan="4">No students found.</td></tr>}
            {students.map(s => (
              <tr key={s.id} className="border-t">
                <td className="p-2">{s.name}</td>
                <td className="p-2">{s.email}</td>
                <td className="p-2">{s.course}</td>
                <td className="p-2">
                  <button onClick={() => edit(s)} className="mr-2 text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => remove(s.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
