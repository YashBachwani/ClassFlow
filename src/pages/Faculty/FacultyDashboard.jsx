import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";

import MaterialUpload from "./MaterialUpload";
import Assignments from "./Assignments";
import QuizTest from "./QuizTest";
import Announcements from "./FacultyAnnouncements";
import Feedback from "./Feedback";
import ViewSchedule from "./ViewSchedule";
import SyllabusTracking from "./SyllabusTracking";
import MarksManagement from "./MarksManagement";

export default function FacultyDashboard() {
  const [activeModule, setActiveModule] = useState("Material Upload");

  const renderModule = () => {
    switch (activeModule) {
      case "Material Upload":
        return <MaterialUpload />;
      case "Assignments":
        return <Assignments />;
      case "Quiz & Tests":
        return <QuizTest />;
      case "Announcements":
        return <Announcements />;
      case "Feedback":
        return <Feedback />;
      case "View Schedule":
        return <ViewSchedule />;
      case "Syllabus Tracking":
        return <SyllabusTracking />;
      case "Marks Management":
        return <MarksManagement />;
      default:
        return <div>Select a module</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar role="faculty" onSelectModule={setActiveModule} />
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-semibold text-green-800 mb-6">{activeModule}</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">{renderModule()}</div>
      </div>
    </div>
  );
}
