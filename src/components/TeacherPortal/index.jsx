import React, { useState } from "react";
import TeacherNavbar from "../TeacherNavbar";
import NavigationMenu from "../NavigationMenu";
import { Outlet } from "react-router-dom";
import './styles.css';
const TeacherPortal = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = window.innerWidth <= 768;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Navbar */}
      <TeacherNavbar toggleSidebar={toggleSidebar} />

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <NavigationMenu
          isSidebarOpen={isSidebarOpen}
          isMobile={isMobile}
        />

        {/* Main Content */}
        <main
          className="main-content"
          style={{
            flex: 1,
            padding: "20px",
            backgroundColor: "#f5f7ff",
            overflowY: "auto",
            left:"150px",
           marginTop:"0px"
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherPortal;
