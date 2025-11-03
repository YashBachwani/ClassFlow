import React, { useEffect, useState } from "react";

const KEY = "classflow_teachers";

export default function ManageTeachers() {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ id: "", name: "", email: "", dept: "" });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    setTeachers(JSON.parse(localStorage.getItem(KEY)) || []);
  }, []);

  const saveAll = (arr) => {
    setTeachers(arr);
    localStorage.setItem(KEY, JSON.stringify(arr));
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return alert("Name & email required");
    if (editingId) {
      const next = teachers.map(t => t.id === editingId ? { ...t, ...form } : t);
      saveAll(next);
      setEditingId(null);
    } else {
      const newT = { ...form, id: Date.now().toString() };
      saveAll([newT, ...teachers]);
    }
    setForm({ id: "", name: "", email: "", dept: "" });
  };

  const edit = (t) => {
    setEditingId(t.id);
    setForm({ id: t.id, name: t.name, email: t.email, dept: t.dept });
  };

  const remove = (id) => {
    if (!confirm("Delete teacher?")) return;
    const next = teachers.filter(t => t.id !== id);
    saveAll(next);
  };

  return (
    <div data-aos="fade-up">
      <h2 className="text-xl font-semibold text-green-700 mb-4">Manage Teachers</h2>

      <form onSubmit={submit} className="grid gap-2 sm:grid-cols-4 mb-4">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Full name" className="px-3 py-2 border rounded" />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="px-3 py-2 border rounded" />
        <input name="dept" value={form.dept} onChange={handleChange} placeholder="Department" className="px-3 py-2 border rounded" />
        <button className="bg-green-600 text-white px-4 py-2 rounded">{editingId ? "Update" : "Add Teacher"}</button>
      </form>

      <div className="bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Dept</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length === 0 && <tr><td className="p-4 text-gray-500" colSpan="4">No teachers found.</td></tr>}
            {teachers.map(t => (
              <tr key={t.id} className="border-t">
                <td className="p-2">{t.name}</td>
                <td className="p-2">{t.email}</td>
                <td className="p-2">{t.dept}</td>
                <td className="p-2">
                  <button onClick={() => edit(t)} className="mr-2 text-blue-600 hover:underline">Edit</button>
                  <button onClick={() => remove(t.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
