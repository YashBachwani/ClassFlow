import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LogOut } from "lucide-react";

const Sidebar = ({ role, onSelectModule }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const menus = {
    admin: [
      "Announcements",
      "Feedback Remarks",
      "Manage Students",
      "Manage Teachers",
      "Manage Courses",
      "Track Student Performance",
      "Assess Student Uploaded Data",
      "Assess Teacher Uploaded Data",
      "Startup Idea Review",
    ],
    faculty: [
      "Material Upload",
      "Assignments",
      "Quiz & Tests",
      "Announcements",
      "Feedback",
      "View Schedule",
      "Syllabus Tracking",
      "Marks Management",
    ],
    student: [
      "Announcements",
      "Attendance Tracker",
      "Lecture Resources",
      "Material Downloads",
      "Quiz & Assignments",
      "Startup Upload",
      "Student Feedback",
      "View Schedule",
      "Syllabus Progress",
    ],
  };

  return (
    <div className="w-64 bg-gradient-to-b from-green-800 to-green-900 text-white min-h-screen flex flex-col border-r border-green-700">
      <div className="p-4 text-center font-bold text-xl border-b border-green-700">
        {role?.charAt(0).toUpperCase() + role?.slice(1)} Panel
      </div>
      <ul className="flex-1 overflow-y-auto p-4 space-y-2">
        {menus[role]?.map((item, i) => (
          <li
            key={i}
            onClick={() => onSelectModule(item)}
            className="p-3 rounded-lg hover:bg-green-700 transition-all cursor-pointer text-sm font-medium"
          >
            {item}
          </li>
        ))}
      </ul>
      
      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 p-4 bg-green-800 hover:bg-red-600 transition-all"
      >
        <LogOut size={18} /> Logout
      </button>
    </div>
  );
};

export default Sidebar;
