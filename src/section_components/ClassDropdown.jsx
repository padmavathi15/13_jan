import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Container, Row, Col, Table } from "react-bootstrap";

const ClassDropdown = () => {
  const { register, formState: { errors } } = useForm();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const classes = ["Class 1", "Class 2"];
  const sections = ["A", "B"];
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
  ];

  const subjects = ["Math", "Science", "History", "English", "Biology", "Geography", "Physics", "Chemistry"];

  const timetable = {
    "Class 1": {
      A: {
        Monday: {
          "9:00 AM - 10:00 AM": "Math",
          "10:00 AM - 11:00 AM": "Science",
        },
        Tuesday: {
          "9:00 AM - 10:00 AM": "History",
        },
      },
    },
  };

  const fillSubject = (() => {
    let index = 0;
    return () => {
      const subject = subjects[index];
      index = (index + 1) % subjects.length;
      return subject;
    };
  })();

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8} xs={12}>
          <h1 className="text-center mb-4">School Management</h1>
          <Form>
            <Row>
              <Col md={6} xs={12}>
                <Form.Group>
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
              </Col>
              <Col md={6} xs={12}>
                <Form.Group>
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
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      {selectedClass && selectedSection && (
        <Row className="mt-4">
          <Col>
            <h5 className="text-center">
              Timetable for {selectedClass} - {selectedSection}
            </h5>
            <div className="table-responsive">
              <Table bordered hover className="custom-table text-center">
                <thead>
                  <tr>
                    <th>Day</th>
                    {timeSlots.map((slot) => (
                      <th key={slot}>{slot}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {days.map((day) => (
                    <tr key={day}>
                      <td>{day}</td>
                      {timeSlots.map((slot) => {
                        const subject =
                          timetable[selectedClass]?.[selectedSection]?.[day]?.[slot] || fillSubject();
                        return <td key={slot}>{subject}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ClassDropdown;
