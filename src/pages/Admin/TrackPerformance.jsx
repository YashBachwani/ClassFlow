import React, { useEffect, useState } from "react";

/**
 * Very simple performance tracker:
 * It looks for `classflow_students` and `classflow_courses` and
 * generates mock marks if not present. This is a frontend-only demo.
 */

export default function TrackPerformance() {
  const [students, setStudents] = useState([]);
  const [report, setReport] = useState([]);

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem("classflow_students")) || [];
    setStudents(s);
    generateReport(s);
    // eslint-disable-next-line
  }, []);

  const generateReport = (studentsList) => {
    // Create mock marks per student per course (if none exist)
    const courses = JSON.parse(localStorage.getItem("classflow_courses")) || [];
    const r = studentsList.map((st) => {
      const marks = courses.map((c) => ({ course: c.name || c.code, marks: Math.floor(Math.random() * 41) + 60 }));
      const avg = Math.round(marks.reduce((a,b)=>a+b.marks,0)/Math.max(1, marks.length));
      return { id: st.id, name: st.name, marks, avg };
    });
    setReport(r);
  };

  return (
    <div data-aos="fade-up">
      <h2 className="text-xl font-semibold text-green-700 mb-4">Track Student Performance</h2>

      {report.length === 0 && <p className="text-gray-500">No student data to show. Add students & courses to generate reports.</p>}

      <div className="grid gap-4">
        {report.map(r => (
          <div key={r.id} className="bg-white p-4 rounded-md shadow">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-gray-800">{r.name}</h3>
              <span className="text-sm text-gray-600">Average: <span className="font-bold text-green-600">{r.avg}%</span></span>
            </div>
            <div className="mt-3 grid sm:grid-cols-3 gap-2">
              {r.marks.map(m => (
                <div key={m.course} className="p-2 border rounded">
                  <p className="text-sm text-gray-500">{m.course}</p>
                  <p className="font-semibold text-gray-800">{m.marks}%</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
