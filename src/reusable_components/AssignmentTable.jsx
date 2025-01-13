import React, { useState } from "react";
import { Button, Table, Pagination, Form, Row, Col } from "react-bootstrap";
import "../css/dataTables.css"; // Import the custom CSS file

const AssignmentData = () => {
  const [assignments, setAssignments] = useState({
    "10th": {
      A: [
        {
          id: 1,
          title: "Math Homework",
          dueDate: "20th December 2024",
          subject: "Mathematics",
          createdAt: "2024-12-18",
          submissions: [
            { studentName: "John Doe", status: "Submitted", grade: "A" },
            { studentName: "Jane Smith", status: "Not Submitted", grade: null },
          ],
        },
      ],
      B: [
        {
          id: 2,
          title: "Science Homework",
          dueDate: "22nd December 2024",
          subject: "Science",
          createdAt: "2024-12-19",
          submissions: [
            { studentName: "Alice Brown", status: "Not Submitted", grade: null },
            { studentName: "Bob White", status: "Submitted", grade: "B" },
          ],
        },
      ],
    },
  });

  const [selectedClass, setSelectedClass] = useState("10th");
  const [selectedSection, setSelectedSection] = useState("A");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAssignments = assignments[selectedClass][selectedSection].filter(
    (assignment) => {
      const today = new Date();
      const assignmentDate = new Date(assignment.createdAt);

      if (filter === "Weekly") {
        const oneWeekAgo = new Date(today);
        oneWeekAgo.setDate(today.getDate() - 7);
        return assignmentDate >= oneWeekAgo;
      }
      if (filter === "Monthly") {
        return (
          assignmentDate.getMonth() === today.getMonth() &&
          assignmentDate.getFullYear() === today.getFullYear()
        );
      }
      if (filter === "Yearly") {
        return assignmentDate.getFullYear() === today.getFullYear();
      }
      return true; // "All" or no filter
    }
  );

  const searchFilteredAssignments = filteredAssignments.filter((assignment) =>
    assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculatePagination = (data) => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return {
      currentRows: data.slice(indexOfFirstRow, indexOfLastRow),
      totalPages: Math.ceil(data.length / rowsPerPage),
    };
  };

  const handleClassChange = (className) => {
    setSelectedClass(className);
    setSelectedSection(Object.keys(assignments[className])[0]);
    setCurrentPage(1);
  };

  const handleSectionChange = (section) => {
    setSelectedSection(section);
    setCurrentPage(1);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1);
  };

  const handleViewSubmissions = (assignment) => {
    if (selectedAssignment === assignment) {
      setSelectedAssignment(null); // Hide submissions if clicked again
    } else {
      setSelectedAssignment(assignment); // Show submissions for this assignment
    }
  };

  const { currentRows, totalPages } = calculatePagination(searchFilteredAssignments);

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        {/* Assignment Table Div */}
        <div className="card mb-4">
          <div className="card-body">
            <h4 className="card-title mb-3">Assignments</h4>

            {/* Class and Section Dropdowns */}
            <Row className="mb-3">
              <Col sm={6}>
                <Form.Select
                  size="sm"
                  value={selectedClass}
                  onChange={(e) => handleClassChange(e.target.value)}
                >
                  <option value="10th">10th</option>
                </Form.Select>
              </Col>
              <Col sm={6}>
                <Form.Select
                  size="sm"
                  value={selectedSection}
                  onChange={(e) => handleSectionChange(e.target.value)}
                >
                  {Object.keys(assignments[selectedClass]).map((section) => (
                    <option key={section} value={section}>
                      {section}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            {/* Filter Buttons */}
            <div className="d-flex mb-3">
              <Button
                className="hollow-btn weekly mr-2"
                size="sm"
                onClick={() => handleFilterChange("Weekly")}
              >
                Weekly
              </Button>
              <Button
                className="hollow-btn monthly mr-2"
                size="sm"
                onClick={() => handleFilterChange("Monthly")}
              >
                Monthly
              </Button>
              <Button
                className="hollow-btn yearly mr-2"
                size="sm"
                onClick={() => handleFilterChange("Yearly")}
              >
                Yearly
              </Button>
            </div>

            {/* Per Page and Search Bar */}
            <div className="d-flex justify-content-between mb-3">
              <Form.Control
                as="select"
                size="sm"
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
                className="w-auto"
              >
                {[5, 10, 15].map((num) => (
                  <option key={num} value={num}>
                    {num} per page
                  </option>
                ))}
              </Form.Control>
              <Form.Control
                type="search"
                placeholder="Search by Title or Subject"
                value={searchQuery}
                onChange={handleSearchChange}
                size="sm"
                className="w-50"
              />
            </div>

            {/* Assignment Table */}
            <div className="table-responsive mb-4">
              <Table striped bordered hover responsive className="custom-table">
                <thead>
                  <tr>
                    <th>Assignment Title</th>
                    <th>Subject</th>
                    <th>Due Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRows.map((assignment) => (
                    <React.Fragment key={assignment.id}>
                      <tr>
                        <td>{assignment.title}</td>
                        <td>{assignment.subject}</td>
                        <td>{assignment.dueDate}</td>
                        <td>
                          <Button
                            size="sm"
                            className="hollow-btn viewsubmission rounded-pill"
                            onClick={() => handleViewSubmissions(assignment)}
                          >
                            {selectedAssignment === assignment
                              ? "Hide Submissions"
                              : "View Submissions"}
                          </Button>
                        </td>
                      </tr>

                      {/* Display Submissions if the assignment is selected */}
                      {selectedAssignment === assignment && (
                        <tr>
                          <td colSpan="4">
                            <Table striped bordered hover responsive className="custom-table">
                              <thead>
                                <tr>
                                  <th>Student Name</th>
                                  <th>Status</th>
                                  <th>Grade</th>
                                </tr>
                              </thead>
                              <tbody>
                                {assignment.submissions.map((submission, index) => (
                                  <tr key={index}>
                                    <td>{submission.studentName}</td>
                                    <td>{submission.status}</td>
                                    <td>{submission.grade || "Not graded"}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </Table>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* Pagination Controls */}
            <div className="d-flex justify-content-between align-items-center mt-3">
              <div>
                Showing{" "}
                {(currentPage - 1) * rowsPerPage + 1} to{" "}
                {Math.min(currentPage * rowsPerPage, searchFilteredAssignments.length)}{" "}
                of {searchFilteredAssignments.length} entries
              </div>
              <div>
                <Pagination>
                  <Pagination.Item
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Pagination.Item>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={currentPage === index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Item
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Pagination.Item>
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentData;
