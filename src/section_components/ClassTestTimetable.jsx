import React, { useState } from "react";
import { Container, Row, Col, Form, Table, InputGroup, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ClassTestTimeTable = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // Added search state

  const classTestData = {
    "10th": {
      "A Sec": [
        { day: "Monday", subject: "Math", date: "2024-01-15", time: "9:00 AM - 12:00 PM" },
        { day: "Tuesday", subject: "Science", date: "2024-01-16", time: "10:00 AM - 1:00 PM" },
        { day: "Wednesday", subject: "English", date: "2024-01-17", time: "9:00 AM - 12:00 PM" },
        { day: "Thursday", subject: "History", date: "2024-01-18", time: "10:00 AM - 1:00 PM" },
        { day: "Friday", subject: "Geography", date: "2024-01-19", time: "9:00 AM - 12:00 PM" },
      ],
      "B Sec": [
        { day: "Monday", subject: "Math", date: "2024-01-20", time: "10:00 AM - 1:00 PM" },
        { day: "Tuesday", subject: "Science", date: "2024-01-21", time: "11:00 AM - 2:00 PM" },
        { day: "Wednesday", subject: "English", date: "2024-01-22", time: "10:00 AM - 1:00 PM" },
        { day: "Thursday", subject: "History", date: "2024-01-23", time: "11:00 AM - 2:00 PM" },
        { day: "Friday", subject: "Geography", date: "2024-01-24", time: "10:00 AM - 1:00 PM" },
      ],
    },
    "9th": {
      "A Sec": [
        { day: "Monday", subject: "Math", date: "2024-01-25", time: "8:00 AM - 11:00 AM" },
        { day: "Tuesday", subject: "Science", date: "2024-01-26", time: "9:00 AM - 12:00 PM" },
        { day: "Wednesday", subject: "English", date: "2024-01-27", time: "8:00 AM - 11:00 AM" },
        { day: "Thursday", subject: "History", date: "2024-01-28", time: "9:00 AM - 12:00 PM" },
        { day: "Friday", subject: "Geography", date: "2024-01-29", time: "8:00 AM - 11:00 AM" },
      ],
      "B Sec": [
        { day: "Monday", subject: "Math", date: "2024-02-01", time: "9:00 AM - 12:00 PM" },
        { day: "Tuesday", subject: "Science", date: "2024-02-02", time: "10:00 AM - 1:00 PM" },
        { day: "Wednesday", subject: "English", date: "2024-02-03", time: "9:00 AM - 12:00 PM" },
        { day: "Thursday", subject: "History", date: "2024-02-04", time: "10:00 AM - 1:00 PM" },
        { day: "Friday", subject: "Geography", date: "2024-02-05", time: "9:00 AM - 12:00 PM" },
      ],
    },
  };

  const handleClassChange = (className) => {
    setSelectedClass(className);
    setSelectedSection(""); // Reset section selection when class changes
  };

  const handleSectionChange = (sectionName) => {
    setSelectedSection(sectionName);
  };

  // Filter function based on search query
  const filteredData = classTestData[selectedClass]?.[selectedSection]?.filter((entry) => {
    return (
      entry.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.date.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <h4 className="text-center mb-4">Class Test Time Table</h4>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Select Class</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedClass}
                  onChange={(e) => handleClassChange(e.target.value)}
                >
                  <option value="">Select a Class</option>
                  {Object.keys(classTestData).map((className) => (
                    <option key={className} value={className}>
                      {className}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Select Section</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedSection}
                  onChange={(e) => handleSectionChange(e.target.value)}
                  disabled={!selectedClass}
                >
                  <option value="">Select a Section</option>
                  {selectedClass &&
                    Object.keys(classTestData[selectedClass]).map((section) => (
                      <option key={section} value={section}>
                        {section}
                      </option>
                    ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {selectedClass && selectedSection ? (
            <div>
              <h5 className="text-center">
                {selectedClass} {selectedSection} Class Test Timetable
              </h5>

              {/* Search bar inside table div and to the right */}
              <div className="d-flex justify-content-end mb-3">
                <InputGroup className="w-auto">
                  <FormControl
                    placeholder="Search by Subject or Date"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ width: "200px" }} // Make the width smaller
                  />
                </InputGroup>
              </div>

              <Table bordered striped className="mt-3 custom-table">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Subject</th>
                    <th>Exam Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData?.length ? (
                    filteredData.map((entry, index) => (
                      <tr key={index}>
                        <td>{entry.day}</td>
                        <td>{entry.subject}</td>
                        <td>{entry.date}</td>
                        <td>{entry.time}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center">
                        No matching records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          ) : (
            <p className="text-center mt-3">Please select a class and section to view the timetable.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ClassTestTimeTable;
