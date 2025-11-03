import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import FacultyDashboard from "./pages/Faculty/FacultyDashboard";
import StudentDashboard from "./pages/Student/StudentDashboard";
import Announcements from "./pages/Admin/Announcements";
import FeedbackRemarks from "./pages/Admin/FeedbackRemarks";
import ManageStudents from "./pages/Admin/ManageStudents";
import ManageTeachers from "./pages/Admin/ManageTeachers";
import ManageCourses from "./pages/Admin/ManageCourses";
import TrackPerformance from "./pages/Admin/TrackPerformance";
import AssessmentStudents from "./pages/Admin/AssessmentStudents";
import AssessmentTeachers from "./pages/Admin/AssessmentTeachers";
import StartupReview from "./pages/Admin/StartupReview";
import Feedback from "./pages/Faculty/Feedback";
import StudentFeedback from "./pages/Student/StudentFeedback";
import MaterialUpload from "./pages/Faculty/MaterialUpload";
import Assignments from "./pages/Faculty/Assignments";
import QuizTest from "./pages/Faculty/QuizTest";
import FacultyAnnouncements from "./pages/Faculty/FacultyAnnouncements";
import ViewSchedule from "./pages/Faculty/ViewSchedule";
import SyllabusTracking from "./pages/Faculty/SyllabusTracking";
import MarksManagement from "./pages/Faculty/MarksManagement";
import StuAnnouncements from "./pages/Student/Announcements";
import AttendanceTracker from "./pages/Student/AttendanceTracker";
import LectureResources from "./pages/Student/LectureResources";
import MaterialDownloads from "./pages/Student/MaterialDownloads";
import QuizAndAssignments from "./pages/Student/QuizAndAssignments";
import StartupUpload from "./pages/Student/StartupUpload";
import StudentViewSchedule from "./pages/Student/StudentViewSchedule";
import SyllabusProgress from "./pages/Student/SyllabusProgress";



export default function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Admin/dashboard" element={<AdminDashboard />} />
        <Route path="/Faculty/dashboard" element={<FacultyDashboard />} />
        <Route path="/Student/dashboard" element={<StudentDashboard />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="feedback-remarks" element={<FeedbackRemarks />} />
        <Route path="manage-students" element={<ManageStudents />} />
        <Route path="manage-teachers" element={<ManageTeachers />} />
        <Route path="manage-courses" element={<ManageCourses />} />
        <Route path="track-performance" element={<TrackPerformance />} />
        <Route path="assessment-students" element={<AssessmentStudents />} />
        <Route path="assessment-teachers" element={<AssessmentTeachers />} />
        <Route path="startup-review" element={<StartupReview />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="material-upload" element={<MaterialUpload />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="quiz-test" element={<QuizTest />} />
        <Route path="announcements" element={<FacultyAnnouncements />} />
        <Route path="view-schedule" element={<ViewSchedule />} />
        <Route path="syllabus-tracking" element={<SyllabusTracking />} />
        <Route path="marks-management" element={<MarksManagement />} />
        <Route path="announcements" element={<StuAnnouncements />} />
        <Route path="attendance-tracker" element={<AttendanceTracker />} />
        <Route path="lecture-resources" element={<LectureResources />} />
        <Route path="material-download" element={<MaterialDownloads />} />
        <Route path="quiz-assignment" element={<QuizAndAssignments />} />
        <Route path="startup-upload" element={<StartupUpload />} />
        <Route path="student-feedback" element={<StudentFeedback />} />
        <Route path="student-view-schedule" element={<StudentViewSchedule />} />
        <Route path="syllabus-progress" element={<SyllabusProgress />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
