import React, { useState } from "react";
import { Container, Form, Table, Pagination } from "react-bootstrap"; // Import React-Bootstrap components

const FinalExamTimeTable = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [openClass, setOpenClass] = useState(null); // Track the class that is open
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  // Final exam data for multiple classes
  const finalExamData = {
    "Class A": [
      { day: "Monday", subject: "Math", date: "2024-05-15", time: "9:00 AM - 12:00 PM" },
      { day: "Tuesday", subject: "Science", date: "2024-05-16", time: "10:00 AM - 1:00 PM" },
      { day: "Wednesday", subject: "English", date: "2024-05-17", time: "9:00 AM - 12:00 PM" },
      { day: "Thursday", subject: "History", date: "2024-05-18", time: "10:00 AM - 1:00 PM" },
      { day: "Friday", subject: "Geography", date: "2024-05-19", time: "9:00 AM - 12:00 PM" },
      { day: "Monday", subject: "Physics", date: "2024-05-20", time: "9:00 AM - 12:00 PM" },
      { day: "Tuesday", subject: "Chemistry", date: "2024-05-21", time: "10:00 AM - 1:00 PM" },
    ],
    "Class B": [
      { day: "Monday", subject: "Math", date: "2024-05-20", time: "10:00 AM - 1:00 PM" },
      { day: "Tuesday", subject: "Science", date: "2024-05-21", time: "11:00 AM - 2:00 PM" },
      { day: "Wednesday", subject: "English", date: "2024-05-22", time: "10:00 AM - 1:00 PM" },
      { day: "Thursday", subject: "History", date: "2024-05-23", time: "11:00 AM - 2:00 PM" },
      { day: "Friday", subject: "Geography", date: "2024-05-24", time: "10:00 AM - 1:00 PM" },
    ],
    "Class C": [
      { day: "Monday", subject: "Math", date: "2024-05-25", time: "8:00 AM - 11:00 AM" },
      { day: "Tuesday", subject: "Science", date: "2024-05-26", time: "9:00 AM - 12:00 PM" },
      { day: "Wednesday", subject: "English", date: "2024-05-27", time: "8:00 AM - 11:00 AM" },
      { day: "Thursday", subject: "History", date: "2024-05-28", time: "9:00 AM - 12:00 PM" },
      { day: "Friday", subject: "Geography", date: "2024-05-29", time: "8:00 AM - 11:00 AM" },
    ],
  };

  // Toggle class exam timetable view
  const handleClassToggle = (className) => {
    setOpenClass(openClass === className ? null : className); // Toggle the class timetable
    setSelectedClass(className); // Set the selected class
  };

  // Get the current page's data
  const getCurrentPageData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = (data) => {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => handlePageChange(i)}>
          {i}
        </Pagination.Item>
      );
    }
    return <Pagination>{pages}</Pagination>;
  };

  return (
    <Container className="mt-4">
      <h4>Final Exam Time Table</h4>

      {/* Dropdown for selecting class */}
      <Form.Group className="mb-3">
        <Form.Label>Select Class</Form.Label>
        <Form.Control
          as="select"
          value={selectedClass}
          onChange={(e) => handleClassToggle(e.target.value)}
        >
          {/* Dynamically populate options based on finalExamData */}
          {Object.keys(finalExamData).map((className) => (
            <option key={className} value={className}>
              {className}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      {/* Toggle-down view for class timetable */}
      {openClass && openClass === selectedClass && (
        <div className="mt-4">
          <h5>{selectedClass} Class Final Exam Timetable</h5>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Day</th>
                <th>Subject</th>
                <th>Exam Date</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentPageData(finalExamData[selectedClass]).map((entry, index) => (
                <tr key={index}>
                  <td>{entry.day}</td>
                  <td>{entry.subject}</td>
                  <td>{entry.date}</td>
                  <td>{entry.time}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {/* Pagination */}
          {renderPagination(finalExamData[selectedClass])}
        </div>
      )}
    </Container>
  );
};

export default FinalExamTimeTable;
