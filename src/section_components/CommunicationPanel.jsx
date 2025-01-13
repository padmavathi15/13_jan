import React, { useState } from "react";
import { Button, Form, ListGroup, Container, Tabs, Tab } from "react-bootstrap";
import Swal from 'sweetalert2'; // Import SweetAlert2 for alert functionality

const CommunicationPanel = () => {
  const [activeRole, setActiveRole] = useState("teacher");
  const [previousMessages, setPreviousMessages] = useState([]);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    className: "",
    section: "",
    title: "",
    date: "",
    description: "",
    meetingLink: "",
    file: null,
  });
  const [errors, setErrors] = useState({});

  const classes = ["10th", "11th", "12th"];
  const sections = ["A", "B", "C"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.studentId) newErrors.studentId = "Student ID is required.";
    if (!formData.studentName) newErrors.studentName = "Student Name is required.";
    if (!formData.className) newErrors.className = "Class is required.";
    if (!formData.section) newErrors.section = "Section is required.";
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    if (!formData.meetingLink) newErrors.meetingLink = "Meeting link is required.";
    return newErrors;
  };

  const handleSend = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      Swal.fire({
        title: 'Confirm Submission',
        text: "Are you sure you want to send this message?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, send it!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          setPreviousMessages([
            ...previousMessages,
            { ...formData, role: activeRole, id: previousMessages.length + 1 },
          ]);
          Swal.fire('Sent!', 'Your message has been sent.', 'success');
          setFormData({
            studentId: "",
            studentName: "",
            className: "",
            section: "",
            title: "",
            date: "",
            description: "",
            meetingLink: "",
            file: null,
          });
          setErrors({});
          setValidated(false);
        }
      });
    } else {
      setErrors(validationErrors);
      setValidated(true);
    }
  };

  const handleCancel = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you want to cancel the form submission?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, go back!',
    }).then((result) => {
      if (result.isConfirmed) {
        setFormData({
          studentId: "",
          studentName: "",
          className: "",
          section: "",
          title: "",
          date: "",
          description: "",
          meetingLink: "",
          file: null,
        });
      }
    });
  };

  const handleViewDetails = (message) => {
    alert(
      `Role: ${message.role}\nStudent ID: ${message.studentId}\nStudent Name: ${message.studentName}\nClass: ${message.className}\nSection: ${message.section}\nTitle: ${message.title}\nDate: ${message.date}\nDescription: ${message.description}\nMeeting Link: ${message.meetingLink}\nFile: ${message.file ? message.file.name : "No file uploaded"}`
    );
  };

  return (
    <Container className="p-4" style={{ fontFamily: 'Sans-Serif' }}>
      <h2>Communication Panel</h2>

      <Tabs activeKey={activeRole} onSelect={(k) => setActiveRole(k)} className="mb-4">
        {["teacher", "admin", "student", "parent"].map((role) => (
          <Tab eventKey={role} title={role.charAt(0).toUpperCase() + role.slice(1)} key={role}>
            <div className="border p-3 mb-4" style={{ maxWidth: '400px', margin: '0 auto' }}>
              <h4>Add a New Message for {role.charAt(0).toUpperCase() + role.slice(1)}</h4>

              <Form noValidate validated={validated} className="forms-sample mx-auto" style={{ maxWidth: '400px' }}>
                <div className="form-group mb-3">
                  <Form.Label>Student ID</Form.Label>
                  <Form.Select
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    required
                    isInvalid={validated && !formData.studentId}
                    className="form-control"
                  >
                    <option value="">Select Student ID</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.studentId}</Form.Control.Feedback>
                </div>

                <div className="form-group mb-3">
                  <Form.Label>Student Name</Form.Label>
                  <Form.Select
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    required
                    isInvalid={validated && !formData.studentName}
                    className="form-control"
                  >
                    <option value="">Select Student Name</option>
                    <option value="John Doe">John Doe</option>
                    <option value="Jane Smith">Jane Smith</option>
                    <option value="Alice Johnson">Alice Johnson</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.studentName}</Form.Control.Feedback>
                </div>

                <div className="form-group mb-3">
                  <Form.Label>Class</Form.Label>
                  <Form.Select
                    name="className"
                    value={formData.className}
                    onChange={handleInputChange}
                    required
                    isInvalid={validated && !formData.className}
                    className="form-control"
                  >
                    <option value="">Select Class</option>
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.className}</Form.Control.Feedback>
                </div>

                <div className="form-group mb-3">
                  <Form.Label>Section</Form.Label>
                  <Form.Select
                    name="section"
                    value={formData.section}
                    onChange={handleInputChange}
                    required
                    isInvalid={validated && !formData.section}
                    className="form-control"
                  >
                    <option value="">Select Section</option>
                    {sections.map((sec) => (
                      <option key={sec} value={sec}>{sec}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">{errors.section}</Form.Control.Feedback>
                </div>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    isInvalid={!!errors.date}
                  />
                  <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Meeting Link"
                    name="meetingLink"
                    value={formData.meetingLink}
                    onChange={handleInputChange}
                    isInvalid={!!errors.meetingLink}
                  />
                  <Form.Control.Feedback type="invalid">{errors.meetingLink}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                  />
                </Form.Group>
                <div className="form-group d-flex justify-content-between">
                  <Button
                    variant="outline-success"
                    size="sm"
                    className="rounded-pill"
                    onClick={handleSend}
                  >
                    Send
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    className="rounded-pill"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </div>
          </Tab>
        ))}
      </Tabs>

      <h4>Previous Messages</h4>
      <ListGroup>
        {previousMessages.map((message) => (
          <ListGroup.Item key={message.id}>
            <strong>{message.title}</strong> (For: {message.role})
            <Button
              variant="info"
              size="sm"
              className="float-end"
              onClick={() => handleViewDetails(message)}
            >
              View Details
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default CommunicationPanel;
