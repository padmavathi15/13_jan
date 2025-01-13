import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import Navbar from "../NavBar";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './styles.css';

const HeroSection1 = () => {
  return (
    <div style={{backgroundColor:"#f5f7ff"}}>
      <Navbar />
      <header className="hero-section d-flex align-items-center">
        <Container className="text-center">
          <h1 className="display-4">
            Welcome to <span className="highlight">Our School Management System</span>
          </h1>
          <p className="lead">
            Streamlining administrative and educational processes with ease.
          </p>
          <Button href="/about" variant="success" className="mt-3">
            Learn More
          </Button>
        </Container>
      </header>
    </div>
  );
};

export default HeroSection1;
