import React, { useEffect, useState } from "react";

export default function ViewSchedule() {
  const [schedule, setSchedule] = useState([]);
  const [subject, setSubject] = useState("");
  const [time, setTime] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [toast, setToast] = useState("");

  // Load existing schedule
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("schedule")) || [];
    setSchedule(stored);
  }, []);

  // File upload handler
  const handleFile = (e) => {
    const f = e.target.files[0];
    if (f) {
      const reader = new FileReader();
      reader.onload = () => {
        setFile({ name: f.name, type: f.type, data: reader.result });
      };
      reader.readAsDataURL(f);
    }
  };

  // Add schedule entry
  const addSchedule = (e) => {
    e.preventDefault();
    const newEntry = {
      subject,
      time,
      desc,
      file,
      created: new Date().toLocaleString(),
    };

    const updated = [...schedule, newEntry];
    setSchedule(updated);
    localStorage.setItem("schedule", JSON.stringify(updated));

    setSubject("");
    setTime("");
    setDesc("");
    setFile(null);
    showToast("✅ Schedule added successfully!");
  };

  // Upcoming session check (every 30 sec)
  useEffect(() => {
    const checkUpcoming = () => {
      const now = new Date();
      schedule.forEach((s) => {
        const scheduleTime = new Date(s.time);
        const diff = (scheduleTime - now) / (1000 * 60); // minutes
        if (diff > 0 && diff < 30) {
          showToast(`🕒 Upcoming session: ${s.subject} at ${s.time}`);
        }
      });
    };

    const interval = setInterval(checkUpcoming, 30000);
    return () => clearInterval(interval);
  }, [schedule]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 4000);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">
          📅 Faculty Schedule Management
        </h2>

        {/* Schedule Form */}
        <form onSubmit={addSchedule} className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            placeholder="Subject / Session Name"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-green-400"
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="border p-2 rounded-lg h-20 focus:ring-2 focus:ring-green-400"
          />

          <div>
            <label className="block mb-1 font-medium text-gray-700">
              📎 Attach file (optional)
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFile}
              className="border p-2 rounded-lg w-full"
            />
            {file && (
              <p className="text-sm text-gray-600 mt-1">
                Uploaded: <b>{file.name}</b>
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-300"
          >
            Add Schedule
          </button>
        </form>

        {/* Schedule List */}
        <h3 className="text-lg font-semibold text-green-800 mb-2">
          🗓️ Upcoming Schedules
        </h3>

        {schedule.length === 0 ? (
          <p className="text-gray-500">No schedule found.</p>
        ) : (
          <ul className="divide-y">
            {schedule.map((s, i) => (
              <li key={i} className="py-3">
                <div className="flex justify-between">
                  <div>
                    <strong className="text-green-700">{s.subject}</strong>{" "}
                    <br />
                    <span className="text-sm text-gray-600">
                      {new Date(s.time).toLocaleString()}
                    </span>
                    {s.desc && (
                      <p className="text-gray-700 mt-1 text-sm">{s.desc}</p>
                    )}
                    {s.file && (
                      <a
                        href={s.file.data}
                        download={s.file.name}
                        className="text-blue-600 text-sm underline mt-1 inline-block"
                      >
                        📎 Download {s.file.name}
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Toast Notification */}
        {toast && (
          <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}
