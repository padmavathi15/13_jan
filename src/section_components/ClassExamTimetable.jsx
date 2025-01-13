import React, { useState } from "react";
import { Table, Form, InputGroup, FormControl } from "react-bootstrap";
import '../css/DataTable.css'; // Ensure this line imports your custom CSS (if not already included)

const ClassExamTimeTable = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const classTestData = {
    "Class A": {
      "Section 1": [
        { day: "Monday", subject: "Math", date: "2024-01-15", time: "9:00 AM - 12:00 PM" },
        { day: "Tuesday", subject: "Science", date: "2024-01-16", time: "10:00 AM - 1:00 PM" },
        { day: "Wednesday", subject: "English", date: "2024-01-17", time: "9:00 AM - 12:00 PM" },
        { day: "Thursday", subject: "History", date: "2024-01-18", time: "10:00 AM - 1:00 PM" },
        { day: "Friday", subject: "Geography", date: "2024-01-19", time: "9:00 AM - 12:00 PM" },
      ],
    },
    "Class B": {
      "Section 1": [
        { day: "Monday", subject: "Math", date: "2024-01-20", time: "10:00 AM - 1:00 PM" },
        { day: "Tuesday", subject: "Science", date: "2024-01-21", time: "11:00 AM - 2:00 PM" },
        { day: "Wednesday", subject: "English", date: "2024-01-22", time: "10:00 AM - 1:00 PM" },
        { day: "Thursday", subject: "History", date: "2024-01-23", time: "11:00 AM - 2:00 PM" },
        { day: "Friday", subject: "Geography", date: "2024-01-24", time: "10:00 AM - 1:00 PM" },
      ],
    },
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setSelectedSection(""); // Reset section when class changes
  };

  const handleSectionChange = (e) => {
    setSelectedSection(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredData =
    classTestData[selectedClass]?.[selectedSection]?.filter(
      (entry) =>
        entry.subject.toLowerCase().includes(searchQuery) ||
        entry.date.includes(searchQuery)
    ) || [];

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title text-center">Class Exam Time Table</h4>
            <div className="row mb-3">
              <div className="col-sm-6">
                <Form.Group>
                  <Form.Label>Select Class</Form.Label>
                  <Form.Select value={selectedClass} onChange={handleClassChange}>
                    <option value="">Select Class</option>
                    {Object.keys(classTestData).map((className) => (
                      <option key={className} value={className}>
                        {className}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-sm-6">
                <Form.Group>
                  <Form.Label>Select Section</Form.Label>
                  <Form.Select value={selectedSection} onChange={handleSectionChange} disabled={!selectedClass}>
                    <option value="">Select Section</option>
                    {selectedClass &&
                      Object.keys(classTestData[selectedClass]).map((section) => (
                        <option key={section} value={section}>
                          {section}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <div></div> {/* Empty div for spacing */}
              <InputGroup style={{ width: "300px" }}>
                <FormControl
                  type="search"
                  placeholder="Search by Subject or Date"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </InputGroup>
            </div>
            <div className="table-responsive d-flex justify-content-center">
              <Table striped bordered hover className="custom-table">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Subject</th>
                    <th>Exam Date</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
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
                        No records found
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassExamTimeTable;
