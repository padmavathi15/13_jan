import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Pagination,
  Modal,
} from "react-bootstrap";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Swal from "sweetalert2";
import "../css/dataTable.css"; // Ensure this path is correct and the CSS file exists

const AddAssignment = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // State Variables
  const [assignments, setAssignments] = useState([]);
  const [studentsSubmitted, setStudentsSubmitted] = useState([
    { studentId: "S123", student: "John Doe", submitted: true },
    { studentId: "S124", student: "Jane Smith", submitted: false },
    { studentId: "S125", student: "Mark Taylor", submitted: false },
  ]);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [viewedAssignment, setViewedAssignment] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "title",
    direction: "asc",
  });
  const [submissionSearchQuery, setSubmissionSearchQuery] = useState("");
  const [submissionRowsPerPage, setSubmissionRowsPerPage] = useState(5);
  const [submissionCurrentPage, setSubmissionCurrentPage] = useState(1);

  // Dummy Data for Initial Assignments
  const dummyAssignments = [
    {
      id: 1,
      title: "Math Homework",
      dueDate: "2025-01-15",
      subject: "Math",
      file: "homework.pdf",
    },
    {
      id: 2,
      title: "English Essay",
      dueDate: "2025-01-18",
      subject: "English",
      file: "essay.pdf",
    },
  ];

  // Initialize Assignments on Component Mount
  useEffect(() => {
    setAssignments(dummyAssignments);
  }, []);

  // Handle Form Submission to Add Assignment
  const onSubmit = (data) => {
    console.log("Form Data:", data); // For debugging purposes

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to add this assignment?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Add it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const newAssignmentWithId = { ...data, id: Date.now() };
        setAssignments((prevAssignments) => [
          ...prevAssignments,
          newAssignmentWithId,
        ]);
        Swal.fire("Added!", "The assignment has been added.", "success");
        reset(); // Reset form fields
      }
    });
  };

  // Handle Alert Parents Function with Correct Template Literal
  const handleAlertParents = (studentId) => {
    const student = studentsSubmitted.find((s) => s.studentId === studentId);
    if (student && !student.submitted) {
      setAlertMessage(`Message sent to parents of ${student.student}`);
      setShowAlertModal(true);
    }
  };

  // Close Alert Modal
  const handleCloseModal = () => setShowAlertModal(false);

  // Handle Pagination for Assignments
  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle Pagination for Submissions
  const handleSubmissionPageChange = (direction) => {
    if (
      direction === "next" &&
      submissionCurrentPage < submissionTotalPages
    ) {
      setSubmissionCurrentPage(submissionCurrentPage + 1);
    } else if (
      direction === "prev" &&
      submissionCurrentPage > 1
    ) {
      setSubmissionCurrentPage(submissionCurrentPage - 1);
    }
  };

  // View Submissions for a Specific Assignment
  const handleViewSubmission = (assignment) => {
    setViewedAssignment(assignment);
    // Reset Submission Pagination and Search when viewing a new assignment
    setSubmissionCurrentPage(1);
    setSubmissionSearchQuery("");
  };

  // Handle Sorting
  const handleSort = (column) => {
    let direction = "asc";
    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: column, direction });
  };

  // Filter Assignments Based on Search Query
  const filteredAssignments = assignments.filter(
    (assignment) =>
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort Assignments Based on Sort Configuration
  const sortedAssignments = [...filteredAssignments].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key])
      return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key])
      return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination Logic for Assignments
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentAssignments = sortedAssignments.slice(
    indexOfFirstRow,
    indexOfLastRow
  );
  const totalPages = Math.ceil(filteredAssignments.length / rowsPerPage);

  // Filter Submissions Based on Search Query
  const filteredSubmissions = studentsSubmitted.filter((submission) =>
    submission.student.toLowerCase().includes(submissionSearchQuery.toLowerCase())
  );

  // Pagination Logic for Submissions
  const submissionIndexOfLastRow = submissionCurrentPage * submissionRowsPerPage;
  const submissionIndexOfFirstRow = submissionIndexOfLastRow - submissionRowsPerPage;
  const currentSubmissions = filteredSubmissions.slice(
    submissionIndexOfFirstRow,
    submissionIndexOfLastRow
  );
  const submissionTotalPages = Math.ceil(
    filteredSubmissions.length / submissionRowsPerPage
  );

  return (
    <Container style={{ overflowY: 'hidden' }}>
      {/* Add Assignment Form */}
      <Row className="mb-4">
        <Col md={6}>
          <Form.Group>
            <Form.Label>Class</Form.Label>
            <Form.Control
              as="select"
              name="class"
              {...register("class", { required: "Class is required" })}
            >
              <option value="">Select Class</option>
              <option value="10th">10th</option>
              <option value="9th">9th</option>
            </Form.Control>
            {errors.class && (
              <p className="text-danger">{errors.class.message}</p>
            )}
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group>
            <Form.Label>Section</Form.Label>
            <Form.Control
              as="select"
              name="section"
              {...register("section", { required: "Section is required" })}
            >
              <option value="">Select Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </Form.Control>
            {errors.section && (
              <p className="text-danger">{errors.section.message}</p>
            )}
          </Form.Group>
        </Col>
      </Row>

      <Row className="justify-content-center mb-4">
        <Col lg={8} md={10}>
          <Card>
            <Card.Body>
              <h4 className="card-title mb-4">Add Assignment</h4>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        type="text"
                        name="title"
                        {...register("title", { required: "Title is required" })}
                        isInvalid={errors.title}
                        placeholder="Enter assignment title"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.title?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Due Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="dueDate"
                        {...register("dueDate", {
                          required: "Due Date is required",
                        })}
                        isInvalid={errors.dueDate}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.dueDate?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Subject</Form.Label>
                      <Form.Control
                        type="text"
                        name="subject"
                        {...register("subject", {
                          required: "Subject is required",
                        })}
                        isInvalid={errors.subject}
                        placeholder="Enter subject"
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.subject?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>File Source</Form.Label>
                      <Form.Control
                        type="file"
                        name="file"
                        {...register("file")}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Button
                  variant="outline-success"
                  size="sm"
                  className="submitbtn rounded-pill mt-3"
                  type="submit"
                >
                  Add Assignment
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Assignment Table */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <h5 className="card-title">Assignments</h5>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="d-flex align-items-center">
                  <span>Show</span>
                  <Form.Select
                    size="sm"
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(parseInt(e.target.value, 10));
                      setCurrentPage(1); // Reset to first page on change
                    }}
                    className="ms-2"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                  </Form.Select>
                  <span className="ms-2">entries</span>
                </div>
                <div className="d-flex align-items-center">
                  <span>Search:</span>
                  <Form.Control
                    type="text"
                    placeholder="Search assignments"
                    className="ms-2"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1); // Reset to first page on search
                    }}
                  />
                </div>
              </div>

              <div className="table-responsive">
                <Table bordered hover className="custom-table" id="assignment-table">
                  <thead>
                    <tr>
                      <th onClick={() => handleSort("title")}>
                        Title{" "}
                        {sortConfig.key === "title" ? (
                          sortConfig.direction === "asc" ? (
                            <FaSortUp />
                          ) : (
                            <FaSortDown />
                          )
                        ) : (
                          <FaSort />
                        )}
                      </th>
                      <th onClick={() => handleSort("subject")}>
                        Subject{" "}
                        {sortConfig.key === "subject" ? (
                          sortConfig.direction === "asc" ? (
                            <FaSortUp />
                          ) : (
                            <FaSortDown />
                          )
                        ) : (
                          <FaSort />
                        )}
                      </th>
                      <th onClick={() => handleSort("dueDate")}>
                        Due Date{" "}
                        {sortConfig.key === "dueDate" ? (
                          sortConfig.direction === "asc" ? (
                            <FaSortUp />
                          ) : (
                            <FaSortDown />
                          )
                        ) : (
                          <FaSort />
                        )}
                      </th>
                      <th>Files</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentAssignments.map((assignment) => (
                      <tr key={assignment.id}>
                        <td>{assignment.title}</td>
                        <td>{assignment.subject}</td>
                        <td>{assignment.dueDate}</td>
                        <td>{assignment.file}</td>
                        <td>
                          <Button
                            className="rounded-pill editbtn"
                            variant="outline-warning"
                            size="sm"
                            
                            onClick={() => handleViewSubmission(assignment)}
                          >
                            View Submissions
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {currentAssignments.length === 0 && (
                      <tr>
                        <td colSpan="5" className="text-center">
                          No assignments found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>

              {/* Pagination Section */}
              <div className="d-flex justify-content-between align-items-center">
                {/* Left side: Showing X to Y of Z */}
                <span>
                  Showing {filteredAssignments.length === 0 ? 0 : indexOfFirstRow + 1} to{" "}
                  {Math.min(indexOfLastRow, filteredAssignments.length)} of{" "}
                  {filteredAssignments.length} entries
                </span>

                {/* Right side: Pagination Controls */}
                <Pagination>
                  {/* Previous Button */}
                  <Pagination.Prev
                    onClick={() => handlePageChange("prev")}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Pagination.Prev>

                  {/* Page Numbers */}
                  {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}

                  {/* Next Button */}
                  <Pagination.Next
                    onClick={() => handlePageChange("next")}
                    disabled={currentPage === totalPages || totalPages === 0}
                  >
                    Next
                  </Pagination.Next>
                </Pagination>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Submissions Table */}
      {viewedAssignment && (
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <h5 className="card-title">
                  Submissions for {viewedAssignment.title}
                </h5>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div className="d-flex align-items-center">
                    <span>Show</span>
                    <Form.Select
                      size="sm"
                      value={submissionRowsPerPage}
                      onChange={(e) => {
                        setSubmissionRowsPerPage(parseInt(e.target.value, 10));
                        setSubmissionCurrentPage(1); // Reset to first page on change
                      }}
                      className="ms-2"
                    >
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                      <option value={15}>15</option>
                    </Form.Select>
                    <span className="ms-2">entries</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <span>Search:</span>
                    <Form.Control
                      type="text"
                      placeholder="Search submissions"
                      className="ms-2"
                      value={submissionSearchQuery}
                      onChange={(e) => {
                        setSubmissionSearchQuery(e.target.value);
                        setSubmissionCurrentPage(1); // Reset to first page on search
                      }}
                    />
                  </div>
                </div>

                <div className="table-responsive">
                  <Table bordered hover className="custom-table">
                    <thead>
                      <tr>
                        <th onClick={() => handleSort("studentId")}>
                          Student ID{" "}
                          {sortConfig.key === "studentId" ? (
                            sortConfig.direction === "asc" ? (
                              <FaSortUp />
                            ) : (
                              <FaSortDown />
                            )
                          ) : (
                            <FaSort />
                          )}
                        </th>
                        <th onClick={() => handleSort("student")}>
                          Student{" "}
                          {sortConfig.key === "student" ? (
                            sortConfig.direction === "asc" ? (
                              <FaSortUp />
                            ) : (
                              <FaSortDown />
                            )
                          ) : (
                            <FaSort />
                          )}
                        </th>
                        <th onClick={() => handleSort("submitted")}>
                          Submitted{" "}
                          {sortConfig.key === "submitted" ? (
                            sortConfig.direction === "asc" ? (
                              <FaSortUp />
                            ) : (
                              <FaSortDown />
                            )
                          ) : (
                            <FaSort />
                          )}
                        </th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentSubmissions.map((submission, index) => (
                        <tr key={submission.studentId}>
                          <td>{submission.studentId}</td>
                          <td>{submission.student}</td>
                          <td>
                            {submission.submitted ? (
                              <span className="text-success">Yes</span>
                            ) : (
                              <span className="text-danger">No</span>
                            )}
                          </td>
                          <td>
                            {!submission.submitted && (
                              <Button
                                className="custom-alert-btn rounded-pill mt-3"
                                variant="outline-danger"
                               
                                size="sm"
                                onClick={() =>
                                  handleAlertParents(submission.studentId)
                                }
                              >
                                Send Alert
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                      {currentSubmissions.length === 0 && (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No submissions found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>

                {/* Pagination Section */}
                <div className="d-flex justify-content-between align-items-center">
                  {/* Left side: Showing X of Y */}
                  <span>
                    Showing{" "}
                    {filteredSubmissions.length === 0
                      ? 0
                      : submissionIndexOfFirstRow + 1}{" "}
                    to{" "}
                    {Math.min(
                      submissionIndexOfLastRow,
                      filteredSubmissions.length
                    )}{" "}
                    of {filteredSubmissions.length}
                  </span>

                  {/* Right side: Pagination Controls */}
                  <Pagination>
                    <Pagination.Prev
                      onClick={() => handleSubmissionPageChange("prev")}
                      disabled={submissionCurrentPage === 1}
                    >
                      Previous
                    </Pagination.Prev>

                    {[...Array(submissionTotalPages)].map((_, index) => (
                      <Pagination.Item
                        key={index + 1}
                        active={index + 1 === submissionCurrentPage}
                        onClick={() => setSubmissionCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </Pagination.Item>
                    ))}

                    <Pagination.Next
                      onClick={() => handleSubmissionPageChange("next")}
                      disabled={
                        submissionCurrentPage === submissionTotalPages ||
                        submissionTotalPages === 0
                      }
                    >
                      Next
                    </Pagination.Next>
                  </Pagination>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Modal for Alert */}
      <Modal show={showAlertModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>{alertMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AddAssignment;
