// src/pages/Faculty/MarksManagement.jsx
import React, { useEffect, useState, useMemo } from "react";

/**
 * MarksManagement
 *
 * Features:
 * - Dynamic assignment columns (Add assignment with +)
 * - Add students (enrollment no + name)
 * - Enter marks per student x assignment
 * - Auto-calculated student totals (sum of marks)
 * - Per-assignment totals (column totals)
 * - Update Sheet button to persist to localStorage (key: 'marksSheet')
 * - Delete assignment or student with re-indexing
 *
 * Styling: Tailwind classes (assumes Tailwind is configured)
 */

export default function MarksManagement() {
  const STORAGE_KEY = "marksSheet_v1";

  // structure:
  // assignments: [{ id, title }]
  // students: [{ id, enrollment, name, marks: { assignmentId: number -> mark } }]
  const [assignments, setAssignments] = useState([]);
  const [students, setStudents] = useState([]);

  // forms
  const [enrollment, setEnrollment] = useState("");
  const [studentName, setStudentName] = useState("");

  // load sheet
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (saved?.assignments && saved?.students) {
      setAssignments(saved.assignments);
      setStudents(saved.students);
    } else {
      // initialize with 1 assignment to match typical sheet
      setAssignments([{ id: Date.now(), title: "Assignment 1" }]);
      setStudents([]);
    }
  }, []);

  // memoised totals per student and per assignment
  const studentTotals = useMemo(() => {
    return students.map((s) => {
      const total = assignments.reduce((sum, a) => {
        const val = Number(s.marks?.[a.id] ?? 0);
        return sum + (isNaN(val) ? 0 : val);
      }, 0);
      return total;
    });
  }, [students, assignments]);

  const assignmentTotals = useMemo(() => {
    return assignments.map((a) =>
      students.reduce((sum, s) => {
        const val = Number(s.marks?.[a.id] ?? 0);
        return sum + (isNaN(val) ? 0 : val);
      }, 0)
    );
  }, [students, assignments]);

  // Add new assignment (auto-named Assignment N)
  const addAssignment = () => {
    const nextIndex = assignments.length + 1;
    const newA = { id: Date.now(), title: `Assignment ${nextIndex}` };
    // add default 0 mark for existing students (marks object may be undefined)
    const nextStudents = students.map((s) => ({
      ...s,
      marks: { ...(s.marks || {}), [newA.id]: 0 },
    }));
    setAssignments((p) => [...p, newA]);
    setStudents(nextStudents);
  };

  // Delete assignment
  const deleteAssignment = (assignmentId) => {
    if (!confirm("Delete this assignment column? This will remove all marks for it.")) return;
    const updatedAssignments = assignments.filter((a) => a.id !== assignmentId);
    // remove marks keyed by assignmentId from students
    const updatedStudents = students.map((s) => {
      const newMarks = { ...(s.marks || {}) };
      delete newMarks[assignmentId];
      return { ...s, marks: newMarks };
    });

    // re-label assignment titles to keep numbering consistent
    const reindexed = updatedAssignments.map((a, idx) => ({
      ...a,
      title: `Assignment ${idx + 1}`,
    }));

    setAssignments(reindexed);
    setStudents(updatedStudents);
  };

  // Add student row
  const addStudent = (e) => {
    e?.preventDefault();
    if (!enrollment.trim() || !studentName.trim()) {
      alert("Please provide enrollment number and student name.");
      return;
    }

    const newStudent = {
      id: Date.now(),
      enrollment: enrollment.trim(),
      name: studentName.trim(),
      marks: assignments.reduce((acc, a) => {
        acc[a.id] = 0;
        return acc;
      }, {}),
    };

    setStudents((p) => [...p, newStudent]);
    setEnrollment("");
    setStudentName("");
  };

  // Delete student
  const deleteStudent = (studentId) => {
    if (!confirm("Delete this student and all their marks?")) return;
    setStudents((p) => p.filter((s) => s.id !== studentId));
  };

  // Update a single mark for studentId and assignmentId
  const updateMark = (studentId, assignmentId, value) => {
    const numeric = value === "" ? "" : Number(value);
    setStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, marks: { ...(s.marks || {}), [assignmentId]: numeric } }
          : s
      )
    );
  };

  // Update sheet -> persist to localStorage
  const updateSheet = () => {
    const payload = { assignments, students };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    // quick visual confirmation
    const toast = document.createElement("div");
    toast.innerText = "✅ Sheet updated successfully!";
    Object.assign(toast.style, {
      position: "fixed",
      right: "20px",
      bottom: "20px",
      background: "#16a34a",
      color: "white",
      padding: "10px 14px",
      borderRadius: "8px",
      boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
      zIndex: 9999,
    });
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 1800);
  };

  // Reset sheet (danger)
  const resetSheet = () => {
    if (!confirm("Reset the whole sheet? This will delete assignments and student marks.")) return;
    setAssignments([{ id: Date.now(), title: "Assignment 1" }]);
    setStudents([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  // Export CSV helper (simple)
  const exportCSV = () => {
    // header
    const headers = ["Enrollment No", "Student Name", ...assignments.map((a) => a.title), "Total"];
    const rows = students.map((s, i) => {
      const row = [s.enrollment, s.name, ...assignments.map((a) => (s.marks?.[a.id] ?? 0)), studentTotals[i]];
      return row;
    });

    const csvContent =
      [headers, ...rows].map((r) => r.map((c) => `"${(c ?? "").toString().replace(/"/g, '""')}"`).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "marks_sheet.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 min-h-screen bg-green-50">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-green-700">📊 Marks Sheet</h2>
          <div className="flex gap-2">
            <button
              onClick={addAssignment}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded"
              title="Add assignment column"
            >
              ＋ Add Assignment
            </button>
            <button
              onClick={exportCSV}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
              title="Export CSV"
            >
              Export CSV
            </button>
            <button
              onClick={resetSheet}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
              title="Reset sheet"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Add Student Form */}
        <form onSubmit={addStudent} className="flex gap-3 items-end mb-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Enrollment No</label>
            <input
              value={enrollment}
              onChange={(e) => setEnrollment(e.target.value)}
              className="border rounded px-3 py-2 w-48"
              placeholder="e.g. 149"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-600">Student Name</label>
            <input
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="border rounded px-3 py-2 w-64"
              placeholder="Full name"
              required
            />
          </div>

          <div>
            <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
              + Add Student
            </button>
          </div>
        </form>

        {/* Sheet table */}
        <div className="overflow-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr className="bg-green-100">
                <th className="border px-3 py-2 text-left">Enrollment No</th>
                <th className="border px-3 py-2 text-left">Student Name</th>

                {assignments.map((a, idx) => (
                  <th key={a.id} className="border px-3 py-2 text-left whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{a.title}</span>
                      <button
                        onClick={() => deleteAssignment(a.id)}
                        className="text-red-600 hover:text-red-800 text-sm px-2"
                        title="Delete assignment"
                      >
                        ✕
                      </button>
                    </div>
                  </th>
                ))}

                <th className="border px-3 py-2 text-left">Total</th>
                <th className="border px-3 py-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan={3 + assignments.length} className="p-6 text-center text-gray-500">
                    No students added yet. Add students above.
                  </td>
                </tr>
              ) : (
                students.map((s, i) => (
                  <tr key={s.id} className="hover:bg-gray-50">
                    <td className="border px-3 py-2">{s.enrollment}</td>
                    <td className="border px-3 py-2">{s.name}</td>

                    {assignments.map((a) => (
                      <td key={a.id} className="border px-3 py-2">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={s.marks?.[a.id] ?? ""}
                          onChange={(e) => updateMark(s.id, a.id, e.target.value)}
                          className="w-24 border rounded px-2 py-1"
                        />
                      </td>
                    ))}

                    <td className="border px-3 py-2 font-semibold">{studentTotals[i]}</td>

                    <td className="border px-3 py-2">
                      <button
                        onClick={() => deleteStudent(s.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

            {/* Totals row */}
            {students.length > 0 && (
              <tfoot>
                <tr className="bg-gray-50">
                  <td className="border px-3 py-2 font-medium">Totals</td>
                  <td className="border px-3 py-2" />
                  {assignmentTotals.map((t, idx) => (
                    <td key={idx} className="border px-3 py-2 font-semibold">
                      {t}
                    </td>
                  ))}
                  <td className="border px-3 py-2 font-semibold">{studentTotals.reduce((a, b) => a + b, 0)}</td>
                  <td className="border px-3 py-2" />
                </tr>
              </tfoot>
            )}
          </table>
        </div>

        {/* Update sheet button */}
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Tip: Click <span className="font-semibold">Update Sheet</span> to persist marks for later.
          </div>
          <div className="flex gap-3">
            <button onClick={updateSheet} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
              Update Sheet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
