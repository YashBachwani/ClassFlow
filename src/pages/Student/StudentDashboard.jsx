import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { User, Bell, LogOut } from "lucide-react";
import { toast } from "react-toastify";

import Announcements from "./Announcements";
import AttendanceTracker from "./AttendanceTracker";
import LectureResources from "./LectureResources";
import MaterialDownloads from "./MaterialDownloads";
import QuizAndAssignments from "./QuizAndAssignments";
import StartupUpload from "./StartupUpload";
import StudentFeedback from "./StudentFeedback";
import StudentViewSchedule from "./StudentViewSchedule";
import SyllabusProgress from "./SyllabusProgress";
import Clock from "../../components/Clock"; // ✅ Clock component

export default function StudentDashboard() {
  const [activeModule, setActiveModule] = useState("Analytics");
  const navigate = useNavigate(); // ✅ Navigation hook

  // ✅ Proper Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    sessionStorage.clear();
    toast.success("Logged out successfully!");
    navigate("/login"); // redirect to login page
  };

  // --- Analytics data ---
  const progressData = [
    { name: "Week 1", progress: 60 },
    { name: "Week 2", progress: 75 },
    { name: "Week 3", progress: 80 },
    { name: "Week 4", progress: 90 },
  ];

  const marksData = [
    { subject: "Math", marks: 85 },
    { subject: "Science", marks: 78 },
    { subject: "English", marks: 88 },
    { subject: "CS", marks: 92 },
  ];

  const renderModule = () => {
    switch (activeModule) {
      case "Announcements":
        return <Announcements />;
      case "Attendance Tracker":
        return <AttendanceTracker />;
      case "Lecture Resources":
        return <LectureResources />;
      case "Material Downloads":
        return <MaterialDownloads />;
      case "Quiz & Assignments":
        return <QuizAndAssignments />;
      case "Startup Upload":
        return <StartupUpload />;
      case "Student Feedback":
        return <StudentFeedback />;
      case "View Schedule":
        return <StudentViewSchedule />;
      case "Syllabus Progress":
        return <SyllabusProgress />;
      default:
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-green-700 mb-6">
              📊 Student Analytics Dashboard
            </h1>

            {/* --- Overview Cards --- */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: "Overall Attendance",
                  value: "92%",
                  color: "bg-green-100 text-green-700",
                },
                {
                  title: "Assignments Completed",
                  value: "18 / 20",
                  color: "bg-blue-100 text-blue-700",
                },
                {
                  title: "Average Marks",
                  value: "84%",
                  color: "bg-yellow-100 text-yellow-700",
                },
                {
                  title: "Upcoming Deadlines",
                  value: "3",
                  color: "bg-red-100 text-red-700",
                },
              ].map((card, i) => (
                <div key={i} className={`p-5 rounded-xl shadow-md ${card.color}`}>
                  <h3 className="text-sm font-medium mb-2">{card.title}</h3>
                  <p className="text-xl font-bold">{card.value}</p>
                </div>
              ))}
            </div>

            {/* --- Charts Section --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Progress Chart */}
              <div className="bg-white rounded-xl shadow-md p-5">
                <h3 className="text-lg font-semibold mb-4 text-green-700">
                  Weekly Progress
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="progress"
                      stroke="#16a34a"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Marks Chart */}
              <div className="bg-white rounded-xl shadow-md p-5">
                <h3 className="text-lg font-semibold mb-4 text-green-700">
                  Marks by Subject
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={marksData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="marks" fill="#15803d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* --- Recent Activity --- */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="text-lg font-semibold mb-4 text-green-700">
                Recent Activities
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  📘 Submitted Assignment: <strong>JavaScript Project</strong> – 2 hrs ago
                </li>
                <li>
                  🧮 Quiz Attempted: <strong>Algebra Quiz</strong> – 5 hrs ago
                </li>
                <li>💬 Feedback Sent to Faculty – 1 day ago</li>
                <li>
                  🗂️ Downloaded Material: <strong>React Notes</strong> – 3 days ago
                </li>
              </ul>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-100 text-zinc-900">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-green-800 to-green-900 text-white flex flex-col border-r border-green-700">
        <div className="p-4 text-center font-bold text-xl border-b border-green-700">
          Student Panel
        </div>
        <ul className="flex-1 overflow-y-auto p-4 space-y-2">
          {[
            "Analytics",
            "Announcements",
            "Attendance Tracker",
            "Lecture Resources",
            "Material Downloads",
            "Quiz & Assignments",
            "Startup Upload",
            "Student Feedback",
            "View Schedule",
            "Syllabus Progress",
          ].map((item, i) => (
            <li
              key={i}
              onClick={() => setActiveModule(item)}
              className={`p-3 rounded-lg hover:bg-green-700 transition-all cursor-pointer text-sm font-medium ${
                activeModule === item ? "bg-green-700" : ""
              }`}
            >
              {item}
            </li>
          ))}
        </ul>

        {/* ✅ Fixed Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 p-4 bg-green-800 hover:bg-red-600 transition-all"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex justify-between items-center p-6 bg-white shadow relative">
          <h1 className="text-xl font-semibold text-green-700">
            Student Dashboard
          </h1>

          {/* ✅ Clock positioned at top center */}
          <div className="absolute left-1/2 -translate-x-1/2 top-4">
            <Clock />
          </div>

          <div className="flex items-center gap-4">
            <Bell className="text-green-700 cursor-pointer" />
            <div className="flex items-center gap-2">
              <User className="text-green-700" />
              <span className="text-sm font-medium">Yash</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">{renderModule()}</div>
      </div>
    </div>
  );
}
