import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import TeacherPortal from "./components/TeacherPortal";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MarksOverview from "./reusable_components/MarksOverview";
import StudentPerformance from "./section_components/StudentPerformanceOverview";
import ClassroomOverview from "./section_components/ClassroomOverview";
import AddAssignment from "./section_components/AssignmentTracker";
import ClassTimetable from "./section_components/ClassTimeTable";
import CommunicationPanel from "./section_components/CommunicationPanel";
import SyllabusDetails from "./section_components/SyllabusDetails";
import Leave from "./section_components/Leave";
import QuarterlyReport from "./section_components/QuarterlyReport";
import FinalExamReport from "./section_components/FinalExamReport";
import HeroSection1 from './components/HeroSection/index';
import { useEffect } from "react";
import MarksReportForm from "./section_components/MarksReportForm";
import TeacherDashboard from "./section_components/TeacherDashboard";
import ExamTimetableNavTab from './section_components/ExamTimeTableNavTab';
import AssignmentsNavTab from "./section_components/AssignmentNavTab";
const App = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isMobileView, setMobileView] = useState(false);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth <= 768);
      if (window.innerWidth > 768) setSidebarOpen(true); // Ensure sidebar is open on larger screens
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initialize on mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroSection1 />} /> {/* Home page route */}
        <Route path="/login" element={<LoginPage />} /> {/* Login page route */}

        <Route path="/teacher-portal" element={<TeacherPortal />}>
          <Route index element={<TeacherDashboard />} />
          <Route path="/teacher-portal/teacherdashboard" element={<TeacherDashboard />} />
          <Route path="/teacher-portal/classoverview" element={<ClassroomOverview />} />
          <Route path="/teacher-portal/assignment-tracker" element={<AssignmentsNavTab />} />
          <Route path="/teacher-portal/classtimetable" element={<ClassTimetable />} />
          <Route path="/teacher-portal/student-performance" element={<StudentPerformance />} />
          <Route path="/teacher-portal/communication-panel" element={<CommunicationPanel />} />
          <Route path="/teacher-portal/syllabus" element={<SyllabusDetails />} />
          <Route path="/teacher-portal/examtimetable" element={<ExamTimetableNavTab />} />
          <Route path="/teacher-portal/leave" element={<Leave />} />
          <Route path="/teacher-portal/marksreport" element={<MarksReportForm />} />
          <Route path="/teacher-portal/quarterlymarksreport" element={<QuarterlyReport />} />
          <Route path="/teacher-portal/finalexammarksreports" element={<FinalExamReport />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
