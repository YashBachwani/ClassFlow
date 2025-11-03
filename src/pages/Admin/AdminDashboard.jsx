import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

// Import all module components
import Announcements from "./Announcements";
import FeedbackRemarks from "./FeedbackRemarks";
import ManageStudents from "./ManageStudents";
import ManageTeachers from "./ManageTeachers";
import ManageCourses from "./ManageCourses";
import TrackPerformance from "./TrackPerformance";
import AssessmentStudents from "./AssessmentStudents";
import AssessmentTeachers from "./AssessmentTeachers";
import StartupReview from "./StartupReview";

export default function AdminDashboard() {
  const [activeModule, setActiveModule] = useState("Announcements");

  // Module Switcher
  const renderModule = () => {
    switch (activeModule) {
      case "Announcements":
        return <Announcements />;
      case "Feedback Remarks":
        return <FeedbackRemarks />;
      case "Manage Students":
        return <ManageStudents />;
      case "Manage Teachers":
        return <ManageTeachers />;
      case "Manage Courses":
        return <ManageCourses />;
      case "Track Student Performance":
        return <TrackPerformance />;
      case "Assess Student Uploaded Data":
        return <AssessmentStudents />;
      case "Assess Teacher Uploaded Data":
        return <AssessmentTeachers />;
      case "Startup Idea Review":
        return <StartupReview />;
      default:
        return <div className="text-gray-500">Select a module</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="admin" onSelectModule={setActiveModule} />
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-semibold text-green-800 mb-6">
          {activeModule}
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md">{renderModule()}</div>
      </div>
    </div>
  );
}
