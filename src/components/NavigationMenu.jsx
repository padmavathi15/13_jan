import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaChalkboardTeacher,
  FaClipboardList,
  FaTable,
  FaUsers,
  FaComments,
  FaBook,
  FaCalendarAlt,
  FaUserClock,
  FaFileAlt,
} from "react-icons/fa";

const NavigationMenu = ({ isSidebarOpen, isMobile }) => {
  const routes = [
    { path: "/teacher-portal/teacherdashboard", label: "Teacher Dashboard", icon: <FaChalkboardTeacher /> },
    { path: "/teacher-portal/classoverview", label: "Classroom Overview", icon: <FaChalkboardTeacher /> },
    { path: "/teacher-portal/assignment-tracker", label: "Assignment Tracker", icon: <FaClipboardList /> },
    { path: "/teacher-portal/classtimetable", label: "Class Timetable", icon: <FaTable /> },
    { path: "/teacher-portal/student-performance", label: "Student Performance", icon: <FaUsers /> },
    { path: "/teacher-portal/communication-panel", label: "Communication Panel", icon: <FaComments /> },
    { path: "/teacher-portal/syllabus", label: "Syllabus", icon: <FaBook /> },
    { path: "/teacher-portal/examtimetable", label: "Exam Timetable", icon: <FaCalendarAlt /> },
    { path: "/teacher-portal/leave", label: "Leave", icon: <FaUserClock /> },
    { path: "/teacher-portal/marksreport", label: "Marks Report", icon: <FaFileAlt /> },
  ];

  return (
    <nav
      className={`sidebar ${isMobile ? (isSidebarOpen ? "open" : "") : isSidebarOpen ? "" : "collapsed"}`}
    >
      <ul className="nav-list">
        {routes.map(({ path, label, icon }) => (
          <li key={path} className="nav-item">
            <NavLink to={path} className="nav-link">
              {icon}
              {isMobile && !isSidebarOpen || <span>{label}</span>}
            </NavLink>
            {!isMobile && !isSidebarOpen && <span className="tooltip">{label}</span>}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationMenu;
