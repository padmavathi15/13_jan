import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import Swal from "sweetalert2";

const LeaveRequestForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    reason: "",
    startDate: "",
    endDate: "",
  });
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.reason || !formData.startDate || !formData.endDate) {
      setValidated(true);
      Swal.fire("Error", "Please fill all required fields.", "error");
      return;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      Swal.fire("Error", "End date must be after start date.", "error");
      return;
    }

    Swal.fire({
      title: "Confirm Leave Request",
      text: "Are you sure you want to submit this leave request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Submit",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const leaveRequest = {
          id: Date.now(),
          ...formData,
        };
        console.log("Submitting leave request:", leaveRequest);
        if (onSubmit) {
          onSubmit(leaveRequest);
        } else {
          console.warn("onSubmit prop is missing");
        }
        Swal.fire("Success", "Leave request submitted successfully!", "success");
        setFormData({ name: "", reason: "", startDate: "", endDate: "" });
        setValidated(false);
      }
    });
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center mt-5"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h4 className="text-center mb-4">Leave Request Form</h4>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="reason" className="mb-3">
            <Form.Label>Reason for Leave</Form.Label>
            <Form.Control
              as="textarea"
              name="reason"
              rows={3}
              placeholder="Enter reason"
              value={formData.reason}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="startDate" className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="endDate" className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-center">
          <Button
  type="submit"
  className="submitbtn rounded-pill"
  style={{
    width: "150px",
  }}
>
  Submit
</Button>

          </div>
        </Form>
      </div>
    </Container>
  );
};

export default LeaveRequestForm;