import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import Swal from "sweetalert2";

const TeacherLeaveRequest = ({ onSubmit }) => {
  const [teacherName, setTeacherName] = useState("");
  const [leaveFrom, setLeaveFrom] = useState("");
  const [leaveTo, setLeaveTo] = useState("");
  const [reason, setReason] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState("");
  const [showRequestForm, setShowRequestForm] = useState(false);

  const showSwal = (title, text, icon, callback) => {
    Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed && callback) {
        callback();
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!teacherName || !leaveFrom || !leaveTo || !reason) {
      setValidated(true);
      setError("Please fill all the required fields.");
      return;
    }

    // Trigger the SweetAlert confirmation before submitting
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to submit the leave request?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, submit",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms, submit the leave request
        const leaveRequest = {
          id: Date.now(),
          teacherName,
          leaveFrom,
          leaveTo,
          reason,
          status: "pending",
        };

        onSubmit(leaveRequest);
        Swal.fire("Submitted!", "Your leave request has been sent to admin.", "success");

        // Reset form and states
        setTeacherName("");
        setLeaveFrom("");
        setLeaveTo("");
        setReason("");
        setShowRequestForm(false);
        setValidated(false);
        setError("");
      }
    });
  };

  return (
    <div style={{ padding: "30px", height: "100vh", borderRadius: "15px" }}>
      <h4 className="text-center mb-4">Teacher Leave Request</h4>

      {error && <Alert variant="danger">{error}</Alert>}

      {!showRequestForm && (
        <Button
          variant="primary"
          onClick={() => setShowRequestForm(true)}
          className="rounded-pill mx-auto d-block"
        >
          Request Leave
        </Button>
      )}

      {showRequestForm && (
        <Form
          noValidate
          validated={validated}
          className="forms-sample mx-auto"
          style={{
            maxWidth: "400px",
            padding: "20px",
            backgroundColor: "#fff", // Keeping white background for the form
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
          onSubmit={handleSubmit}
        >
          <Form.Group className="mb-3">
            <Form.Label>Teacher Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              required
              isInvalid={validated && !teacherName}
            />
            <Form.Control.Feedback type="invalid">Teacher Name is required.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Leave From</Form.Label>
            <Form.Control
              type="date"
              value={leaveFrom}
              onChange={(e) => setLeaveFrom(e.target.value)}
              required
              isInvalid={validated && !leaveFrom}
            />
            <Form.Control.Feedback type="invalid">Start date is required.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Leave To</Form.Label>
            <Form.Control
              type="date"
              value={leaveTo}
              onChange={(e) => setLeaveTo(e.target.value)}
              required
              isInvalid={validated && !leaveTo}
            />
            <Form.Control.Feedback type="invalid">End date is required.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Reason</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter the reason for leave"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              isInvalid={validated && !reason}
            />
            <Form.Control.Feedback type="invalid">Reason is required.</Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex justify-content-between">
            <Button
              type="submit"
              backgroundColor="white"
              className="btn-white rounded-pill" // Submit button with white background
            >
              Submit
            </Button>
            <Button
              type="button"
              backgroundColor="white"
              className="btn-white rounded-pill text-danger" // Cancel button with white background and red text
              onClick={() => setShowRequestForm(false)}
            >
              Cancel
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default TeacherLeaveRequest;