import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";

const ClassDropdown = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const classes = ["Class 1", "Class 2"];
  const sections = ["A", "B"];
  
  const timetable = {
    "Class 1": {
      A: {
        Monday: {
          "9:00 AM - 10:00 AM": "Mathematics",
          "10:00 AM - 11:00 AM": "Hindi",
          "11:00 AM - 12:00 PM": "Science",
          "12:00 PM - 1:00 PM": "General Knowledge",
          "1:00 PM - 2:00 PM": "LUNCH BREAK",
          "2:00 PM - 3:00 PM": "Art",
          "3:00 PM - 4:00 PM": "Sports",
        },
        // Other days for Class 1 Section A
      },
      B: {
        Monday: {
          "9:00 AM - 10:00 AM": "History",
          "10:00 AM - 11:00 AM": "Geography",
          "11:00 AM - 12:00 PM": "Mathematics",
          "12:00 PM - 1:00 PM": "Science",
          "1:00 PM - 2:00 PM": "LUNCH BREAK",
          "2:00 PM - 3:00 PM": "Music",
          "3:00 PM - 4:00 PM": "Dance",
        },
        // Other days for Class 1 Section B
      },
    },
    // Timetable for Class 2
  };

  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
  ];

  const onSubmit = () => {
    alert(`Selected Class: ${selectedClass}\nSelected Section: ${selectedSection}`);
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center mb-4">School Management</h1>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Select Class:</Form.Label>
              <Form.Select
                {...register("class", { required: "Class is required" })}
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Select Class</option>
                {classes.map((className) => (
                  <option key={className} value={className}>
                    {className}
                  </option>
                ))}
              </Form.Select>
              {errors.class && (
                <Form.Text className="text-danger">{errors.class.message}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Section:</Form.Label>
              <Form.Select
                {...register("section", { required: "Section is required" })}
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                disabled={!selectedClass}
              >
                <option value="">Select Section</option>
                {sections.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </Form.Select>
              {errors.section && (
                <Form.Text className="text-danger">{errors.section.message}</Form.Text>
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
      {selectedClass && selectedSection && (
        <Row className="mt-4">
          <Col>
            <h5>
              Timetable for {selectedClass} - {selectedSection}
            </h5>
            <Table striped bordered hover>
              <thead className="table-dark">
                <tr>
                  <th>Day</th>
                  {timeSlots.map((slot) => (
                    <th key={slot}>{slot}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(timetable[selectedClass]?.[selectedSection] || {}).map(
                  ([day, slots]) => (
                    <tr key={day}>
                      <td>{day}</td>
                      {timeSlots.map((slot) => (
                        <td key={slot}>{slots[slot] || "FREE"}</td>
                      ))}
                    </tr>
                  )
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ClassDropdown;
