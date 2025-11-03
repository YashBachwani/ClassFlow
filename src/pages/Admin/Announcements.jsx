import React, { useState, useEffect } from "react";

const STORAGE_KEY = "classflow_announcements";

export default function Announcements() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setItems(saved);
  }, []);

  const addAnnouncement = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      title,
      body,
      date: new Date().toISOString(),
    };
    const next = [newItem, ...items];
    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setTitle("");
    setBody("");
  };

  const remove = (id) => {
    const next = items.filter((i) => i.id !== id);
    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  return (
    <div data-aos="fade-up">
      <h2 className="text-xl font-semibold text-green-700 mb-4">Announcements</h2>

      <form onSubmit={addAnnouncement} className="mb-4 grid gap-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Title" className="px-3 py-2 border rounded-md" />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} required placeholder="Announcement body" className="px-3 py-2 border rounded-md" rows="4" />
        <button className="self-start bg-green-600 text-white px-4 py-2 rounded-md">Publish</button>
      </form>

      <div className="space-y-4">
        {items.length === 0 && <p className="text-gray-500">No announcements yet.</p>}
        {items.map((a) => (
          <div key={a.id} className="p-4 border rounded-md bg-white">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">{a.title}</h3>
                <p className="text-sm text-gray-500">{new Date(a.date).toLocaleString()}</p>
              </div>
              <button onClick={() => remove(a.id)} className="text-sm text-red-500 hover:underline">Delete</button>
            </div>
            <p className="mt-2 text-gray-700">{a.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
