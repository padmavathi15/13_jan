import React, { useState, useEffect, useRef } from "react";
import { Navbar, NavDropdown, Container, Image, Button, Modal, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BiBell } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import { FiPower } from 'react-icons/fi'; // Power button icon from react-icons

const TeacherNavbar = ({ toggleSidebar }) => {
  const [notifications, setNotifications] = useState({
    student: [
      { id: 1, message: "Student A needs help with homework", replied: false },
      { id: 2, message: "Student B submitted an assignment", replied: false },
    ],
    parent: [
      { id: 3, message: "Parent of Student A has a query", replied: false },
    ],
    admin: [{ id: 4, message: "Admin: Upcoming meeting", replied: false }],
  });

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isProfileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const profileDropdownRef = useRef(null); // Ref to track dropdown

  const navigate = useNavigate();

  // Calculate notification count
  const notificationCount = Object.values(notifications)
    .flat()
    .filter((msg) => !msg.replied).length;

  // Open message modal
  const handleNotificationClick = (message) => {
    setSelectedMessage(message);
    setShowModal(true);
  };

  // Handle reply submission
  const handleReplySubmit = () => {
    if (selectedMessage) {
      setNotifications((prev) => {
        const updatedNotifications = { ...prev };
        for (const category in updatedNotifications) {
          updatedNotifications[category] = updatedNotifications[category].map(
            (msg) =>
              msg.id === selectedMessage.id ? { ...msg, replied: true } : msg
          );
        }
        return updatedNotifications;
      });
    }
    setShowModal(false);
    setSelectedMessage(null);
  };

  // Handle logout
  const handleLogout = () => {
    navigate("/");
  };

  // Toggle profile dropdown visibility
  const toggleProfileDropdown = () => {
    setProfileDropdownVisible((prev) => !prev);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <>
      {/* Navbar */}
      <Navbar
        bg="white"
        expand="lg"
        fixed="top"
        className="d-flex align-items-center justify-content-between"
        style={{ height: "50px", boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)" }}
      >
        <Container fluid>
          {/* Left: School Logo */}
          <Navbar.Brand
            as={Link}
            to="/"
            className="d-flex align-items-center"
          >
            <Image
              src="/images/school_logo1.jpg"
              alt="logo"
              style={{ height: "40px", marginRight: "10px" }}
            />
            <h6 className="d-none d-lg-block" style={{ margin: 0, color: "#000" }}>
              ABC International Public School
            </h6>
          </Navbar.Brand>

          {/* Right: Icons */}
          <div className="d-flex align-items-center">
            {/* Notification Icon */}
            <NavDropdown
              title={
                <div
                  className="position-relative"
                  style={{ color: "#007bff", cursor: "pointer" }}
                >
                  <BiBell style={{ fontSize: "24px" }} />
                  {notificationCount > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "10px" }}
                    >
                      {notificationCount}
                    </span>
                  )}
                </div>
              }
              id="notificationDropdown"
              align="end"
            >
              {Object.keys(notifications).map((category) => (
                <React.Fragment key={category}>
                  <NavDropdown.Header>
                    {category.charAt(0).toUpperCase() + category.slice(1)} Messages
                  </NavDropdown.Header>
                  {notifications[category].length > 0 ? (
                    notifications[category].map((msg) => (
                      <NavDropdown.Item
                        key={msg.id}
                        onClick={() => handleNotificationClick(msg)}
                      >
                        {msg.message}{" "}
                        {!msg.replied && (
                          <span className="badge bg-warning">New</span>
                        )}
                      </NavDropdown.Item>
                    ))
                  ) : (
                    <NavDropdown.Item disabled>No messages</NavDropdown.Item>
                  )}
                  <NavDropdown.Divider />
                </React.Fragment>
              ))}
            </NavDropdown>

            {/* Profile Image */}
            <div
              className="position-relative"
              ref={profileDropdownRef}
            >
              <Image
                src="/images/teacherimg.jfif"
                roundedCircle
                style={{
                  width: "35px",
                  height: "35px",
                  marginRight: "10px",
                  cursor: "pointer",
                }}
                onClick={toggleProfileDropdown}
              />
              {isProfileDropdownVisible && (
                <div
                  className="position-absolute bg-white border rounded shadow-sm"
                  style={{
                    top: "45px",
                    right: 0,
                    zIndex: 1000,
                    padding: "10px",
                    width: "200px",
                  }}
                >
                  <p className="mb-1">
                    <strong>ID:</strong> T12345
                  </p>
                  <p className="mb-2">
                    <strong>Name:</strong> Padma
                  </p>
                  <Button
      variant="link"
      style={{
        backgroundColor: 'transparent', // No background color
        border: 'none',                 // Remove border
        color: '#4b49ac',               // Add your preferred color
        padding: '0.5rem',              // Optional padding
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',                  // Space between icon and text
        fontSize: '14px',               // Font size for text
      }}
      onClick={handleLogout}
    >
      <FiPower style={{ fontSize: '18px' }} /> {/* Power button icon */}
      Logout
    </Button>
                </div>
              )}
            </div>

            {/* Hamburger Icon */}
            <button
              className="sidebar-toggle btn btn-link p-0"
              onClick={toggleSidebar}
              style={{
                fontSize: "24px",
                color: "#000",
                backgroundColor: "transparent",
                border: "none",
              }}
            >
              <FaBars />
            </button>
          </div>
        </Container>
      </Navbar>

      {/* Modal for Reply */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reply to Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedMessage && <p>{selectedMessage.message}</p>}
          <Form>
            <Form.Group controlId="reply">
              <Form.Label>Your Reply</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Type your reply here..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleReplySubmit}>
            Submit Reply
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TeacherNavbar;
