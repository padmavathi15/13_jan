import React from "react";
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Navbar from "../NavBar";  // Assuming Navbar is already using React Bootstrap components
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <Container fluid className="vh-100 d-flex">
        {/* Left Half */}
        <Col md={6} className="d-flex flex-column justify-content-between p-3">
          {["Admin", "Teacher", "Student", "Parent"].map((portal, index) => (
            <Card key={index} className="mb-3 p-3">
              <Card.Body className="text-center">
                <h3>{portal} Portal</h3>
                <Button 
                  variant="primary" 
                  onClick={() => navigate(`/${portal.toLowerCase()}-portal`)}
                  className="w-100">
                  {portal === "Teacher" ? (
                    <span className="text-light">Teacher</span>
                  ) : (
                    "Login"
                  )}
                </Button>
              </Card.Body>
            </Card>
          ))}
        </Col>

        {/* Right Half */}
        <Col md={6} className="position-relative p-0">
          <div className="position-absolute top-50 start-50 translate-middle text-center text-white p-4 bg-dark bg-opacity-50 rounded-3">
            <h2>Welcome to the Portals</h2>
            <p>Each portal offers specific functionality for administrators, teachers, students, and parents. Choose your portal and login to access the respective features.</p>
          </div>
        </Col>
      </Container>
    </div>
  );
};

export default LoginPage;
