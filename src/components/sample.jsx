import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink, Navigate } from "react-router-dom"; // Import NavLink
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './sample.css';


const App = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Admin dropdown state
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false); // Notification dropdown state

  const toggleSidebar = () => {
    if (window.innerWidth < 992) {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleNotificationDropdown = () => {
    setNotificationDropdownOpen(!notificationDropdownOpen);
  };

  // Initialize tooltips only when the sidebar is collapsed
  useEffect(() => {
    if (sidebarCollapsed) {
      const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      const tooltipList = tooltipTriggerList.map(tooltipTriggerEl => new window.bootstrap.Tooltip(tooltipTriggerEl));
      
      return () => {
        tooltipList.forEach(tooltip => tooltip.dispose());
      };
    }
  }, [sidebarCollapsed]);

  return (
    <Router>
      <div className="app-container">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
          <div className="container-fluid d-flex flex-now justify-content-between align-items-center">
            <a className="navbar-brand" href="#">
              <img src="/school_logo.jpg" alt="School Logo" width="40" />
              <span className="d-none d-lg-inline ms-2" style={{
                color: "rgb(75, 72, 172)", // Text color
                fontSize: "16px",          // Font size
                fontWeight: "bold",        // Font weight
                margin: "20px 0",          // Vertical margin
                fontFamily: "'Arial'", // Font family
              }}>SANTHINIKETHAN</span>
            </a>
            {/* Toggle button for large screens with a gap of 20px */}
            <button className="btn btn-light d-none d-lg-block" onClick={toggleSidebar} style={{ marginLeft: '20px' }}>
              <i className="bi bi-list"></i>
            </button>
            
            <div className="d-flex align-items-center">
              {/* Toggle button beside admin profile for small screens */}
              <button className="btn btn-light d-lg-none" onClick={toggleSidebar}>
                <i className="bi bi-list"></i>
              </button>
              <button className="btn btn-light me-3" onClick={toggleNotificationDropdown}>
                <i className="bi bi-bell"></i>
              </button>
              <div className="dropdown" onClick={toggleDropdown}>
                <img
                  src="/admin.jpg"
                  alt="Admin Profile"
                  className="rounded-circle"
                  width="40"
                  height="40"
                  style={{ cursor: 'pointer' }}
                />
                {dropdownOpen && (
                  <div className="dropdown-menu show">
                    <div className="dropdown-item">
                      <strong>Admin Name</strong>
                    </div>
                    <div className="dropdown-item">
                      admin@example.com
                    </div>
                    <div className="dropdown-divider"></div>
                    <button className="dropdown-item" onClick={() => alert('Logged out!')}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Sidebar */}
        <div className={sidebar ${isMobileSidebarOpen ? 'mobile-open' : sidebarCollapsed ? 'collapsed' : ''}}>
          <ul className="list-unstyled">
            <li>
              <NavLink to="/dashboard" 
                       className={({ isActive }) => (isActive ? 'active' : '')} 
                       data-bs-toggle={sidebarCollapsed ? "tooltip" : undefined} 
                       data-bs-placement="right" 
                       title={sidebarCollapsed ? "Dashboard" : undefined}
                       data-bs-custom-class="custom-tooltip">
                <i className="bi bi-speedometer2"></i>
                <span className="sidebar-text"> Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/students" 
                       className={({ isActive }) => (isActive ? 'active' : '')} 
                       data-bs-toggle={sidebarCollapsed ? "tooltip" : undefined} 
                       data-bs-placement="right" 
                       title={sidebarCollapsed ? "Students" : undefined}
                       data-bs-custom-class="custom-tooltip">
                <i className="bi bi-people"></i>
                <span className="sidebar-text"> Students</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/teachers" 
                       className={({ isActive }) => (isActive ? 'active' : '')} 
                       data-bs-toggle={sidebarCollapsed ? "tooltip" : undefined} 
                       data-bs-placement="right" 
                       title={sidebarCollapsed ? "Teachers" : undefined}
                       data-bs-custom-class="custom-tooltip">
                <i className="bi bi-person"></i>
                <span className="sidebar-text"> Teachers</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/parents" 
                       className={({ isActive }) => (isActive ? 'active' : '')} 
                       data-bs-toggle={sidebarCollapsed ? "tooltip" : undefined} 
                       data-bs-placement="right" 
                       title={sidebarCollapsed ? "Parents" : undefined}
                       data-bs-custom-class="custom-tooltip">
                <i className="bi bi-person-heart"></i>
                <span className="sidebar-text"> Parents</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/classes" 
                       className={({ isActive }) => (isActive ? 'active' : '')} 
                       data-bs-toggle={sidebarCollapsed ? "tooltip" : undefined} 
                       data-bs-placement="right" 
                       title={sidebarCollapsed ? "Classes" : undefined}
                       data-bs-custom-class="custom-tooltip">
                <i className="bi bi-book"></i>
                <span className="sidebar-text"> Classes</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/fees" 
                       className={({ isActive }) => (isActive ? 'active' : '')} 
                       data-bs-toggle={sidebarCollapsed ? "tooltip" : undefined} 
                       data-bs-placement="right" 
                       title={sidebarCollapsed ? "Fees" : undefined}
                       data-bs-custom-class="custom-tooltip">
                <i className="bi bi-cash"></i>
                <span className="sidebar-text"> Fees</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/events" 
                       className={({ isActive }) => (isActive ? 'active' : '')} 
                       data-bs-toggle={sidebarCollapsed ? "tooltip" : undefined} 
                       data-bs-placement="right" 
                       title={sidebarCollapsed ? "Events" : undefined}
                       data-bs-custom-class="custom-tooltip">
                <i className="bi bi-calendar"></i>
                <span className="sidebar-text"> Events</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/library" 
                       className={({ isActive }) => (isActive ? 'active' : '')} 
                       data-bs-toggle={sidebarCollapsed ? "tooltip" : undefined} 
                       data-bs-placement="right" 
                       title={sidebarCollapsed ? "Library" : undefined}
                       data-bs-custom-class="custom-tooltip">
                <i className="bi bi-book"></i>
                <span className="sidebar-text"> Library</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/bus-tracking" 
                       className={({ isActive }) => (isActive ? 'active' : '')} 
                       data-bs-toggle={sidebarCollapsed ? "tooltip" : undefined} 
                       data-bs-placement="right" 
                       title={sidebarCollapsed ? "Bus Tracking" : undefined}
                       data-bs-custom-class="custom-tooltip">
                <i className="bi bi-bus-front-fill"></i>
                <span className="sidebar-text"> Bus Tracking</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/bus-schedule" 
                       className={({ isActive }) => (isActive ? 'active' : '')} 
                       data-bs-toggle={sidebarCollapsed ? "tooltip" : undefined} 
                       data-bs-placement="right" 
                       title={sidebarCollapsed ? "Bus Schedule" : undefined}
                       data-bs-custom-class="custom-tooltip">
                <i className="bi bi-calendar-week"></i>
                <span className="sidebar-text"> Bus Schedule</span>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className={content ${sidebarCollapsed ? 'expanded' : ''}}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route path="/parents" element={<Parents />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/events" element={<Events />} />
            <Route path="/library" element={<Library />} />
            <Route path="/bus-tracking" element={<BusTracking />} />
            <Route path="/fees" element={<Fees />} />
            <Route path="/bus-schedule" element={<BusSchedule />} />
            {/* Redirect from root path to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>

        {/* Notification Dropdown */}
        {notificationDropdownOpen && (
          <div className="dropdown-menu show" style={{ position: 'fixed', top: '56px', right: '20px', zIndex: 1050 }}>
            <div className="dropdown-item">
              <strong>Notifications</strong>
            </div>
            <div className="dropdown-divider"></div>
            <div className="dropdown-item">
              <div className="d-flex align-items-center">
                <i className="bi bi-bell-fill me-2"></i>
                <div>
                  <p className="mb-0">From students</p>
                  <small className="text-muted">2 minutes ago</small>
                </div>
              </div>
            </div>
            <div className="dropdown-item">
              <div className="d-flex align-items-center">
                <i className="bi bi-bell-fill me-2"></i>
                <div>
                  <p className="mb-0">From teachers</p>
                  <small className="text-muted">5 minutes ago</small>
                </div>
              </div>
            </div>
            <div className="dropdown-item">
              <div className="d-flex align-items-center">
                <i className="bi bi-bell-fill me-2"></i>
                <div>
                  <p className="mb-0">From parents</p>
                  <small className="text-muted">10 minutes ago</small>
                </div>
              </div>
            </div>
            <div className="dropdown-divider"></div>
            <div className="dropdown-item text-center">
              <button className="btn btn-link" onClick={() => alert('View all notifications!')}>View all notifications</button>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;