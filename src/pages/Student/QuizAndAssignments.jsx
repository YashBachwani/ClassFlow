import React, { useEffect, useState } from "react";

export default function QuizAndAssignments() {
  const [quizzes, setQuizzes] = useState([]);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    setQuizzes(JSON.parse(localStorage.getItem("facultyQuizData")) || []);
  }, []);

  const handleUpload = (id, file) => {
    const newResponses = { ...responses, [id]: file.name };
    setResponses(newResponses);
    localStorage.setItem("studentQuizResponses", JSON.stringify(newResponses));
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-green-700 mb-3">📝 Quizzes & Assignments</h2>
      {quizzes.length === 0 ? (
        <p>No active quizzes or assignments.</p>
      ) : (
        quizzes.map((q, i) => (
          <div key={i} className="border-b py-3">
            <h3 className="font-semibold">{q.title}</h3>
            {q.file && (
              <a href={q.file} target="_blank" rel="noreferrer" className="text-blue-500 underline">
                View Material
              </a>
            )}
            <div className="mt-2">
              <input type="file" onChange={(e) => handleUpload(q.id || i, e.target.files[0])} />
              {responses[q.id || i] && (
                <p className="text-green-600 text-sm">Uploaded: {responses[q.id || i]}</p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
