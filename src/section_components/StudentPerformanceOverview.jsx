import React, { useState } from "react";
import { Button, Table, Alert, Form, Modal, Pagination } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2'; // Import SweetAlert2 for alert functionality

const StudentPerformance = () => {
  const initialStudentsData = [
    { id: 1, name: "Alice", marks: { Math: 80, English: 90, Science: 85, History: 88 }, className: "5th", section: "A" },
    { id: 2, name: "Bob", marks: { Math: 70, English: 75, Science: 80, History: 78 }, className: "6th", section: "B" },
    { id: 3, name: "Charlie", marks: { Math: 95, English: 98, Science: 100, History: 99 }, className: "7th", section: "C" },
    { id: 4, name: "David", marks: { Math: 60, English: 65, Science: 55, History: 70 }, className: "8th", section: "A" },
  ];

  const [students, setStudents] = useState(initialStudentsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [classSelection, setClassSelection] = useState("");
  const [sectionSelection, setSectionSelection] = useState("");
  const [taskSelection, setTaskSelection] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const calculateTotalAndAverage = (marks) => {
    const subjects = Object.values(marks);
    const totalMarks = subjects.reduce((sum, mark) => sum + mark, 0);
    const average = totalMarks / subjects.length;
    return { totalMarks, average };
  };

  const handleEditMarks = (student) => {
    Swal.fire({
      title: 'Edit Marks',
      text: `Are you sure you want to edit marks for ${student.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, edit it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setEditStudent(student);
        setShowModal(true);
      }
    });
  };

  const handleUpdateMarks = () => {
    const updatedStudents = students.map((student) =>
      student.id === editStudent.id ? { ...student, marks: editStudent.marks } : student
    );
    setStudents(updatedStudents);
    setShowModal(false);
  };

  const handleDeleteStudent = (studentId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedStudents = students.filter((student) => student.id !== studentId);
        setStudents(updatedStudents);
        setMessage(`Student with ID ${studentId} has been deleted.`);
      }
    });
  };

  const handleNotification = (student) => {
    if (!taskSelection) {
      setMessage("Please select a task type before sending notifications.");
      return;
    }
    Swal.fire({
      title: 'Notify Parent',
      text: `Send notification to the parent of ${student.name} for ${taskSelection} task?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, notify them!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        setMessage(`Notification sent to the parent of ${student.name} for ${taskSelection} task.`);
      }
    });
  };

  const filteredStudents = students.filter((student) => {
    const { id, name, className, section, marks } = student;
    const markValues = Object.values(marks).join(" ");
    const searchLower = searchTerm.toLowerCase();

    const matchesSearch =
      id.toString().includes(searchLower) ||
      name.toLowerCase().includes(searchLower) ||
      className.toLowerCase().includes(searchLower) ||
      section.toLowerCase().includes(searchLower) ||
      markValues.includes(searchLower);

    const matchesClass = !classSelection || className === classSelection;
    const matchesSection = !sectionSelection || section === sectionSelection;

    return matchesSearch && matchesClass && matchesSection;
  });

  const calculatePagination = (data, currentPage) => {
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    return {
      currentRows: data.slice(indexOfFirstRow, indexOfLastRow),
      totalPages: Math.ceil(data.length / rowsPerPage),
    };
  };

  const { currentRows, totalPages } = calculatePagination(filteredStudents, currentPage);
  const subjects = students.length > 0 ? Object.keys(students[0].marks) : [];

  return (
    <div className="container mt-5">
      <h2>Student Performance Overview</h2>

      {message && <Alert variant="success">{message}</Alert>}

      <div className="row mb-3">
        <div className="col">
          <Form.Group controlId="classSelection">
            <Form.Label>Select Class:</Form.Label>
            <Form.Control
              as="select"
              size="sm"
              value={classSelection}
              onChange={(e) => setClassSelection(e.target.value)}
            >
              <option value="">Select Class</option>
              {["5th", "6th", "7th", "8th"].map((className) => (
                <option key={className} value={className}>
                  {className}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </div>
        <div className="col">
          <Form.Group controlId="sectionSelection">
            <Form.Label>Select Section:</Form.Label>
            <Form.Control
              as="select"
              size="sm"
              value={sectionSelection}
              onChange={(e) => setSectionSelection(e.target.value)}
            >
              <option value="">Select Section</option>
              {["A", "B", "C"].map((section) => (
                <option key={section} value={section}>
                  {section}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </div>
        <div className="col">
          <Form.Group controlId="taskSelection">
            <Form.Label>Select Task Type:</Form.Label>
            <Form.Control
              as="select"
              size="sm"
              value={taskSelection}
              onChange={(e) => setTaskSelection(e.target.value)}
            >
              <option value="">Select Task Type</option>
              {["Daily", "Weekly", "Monthly"].map((task) => (
                <option key={task} value={task}>
                  {task}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </div>
      </div>

      <div className="d-flex justify-content-between mb-3 align-items-center">
        <span>
          Show entries
          <select
            className="form-select mx-2"
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(parseInt(e.target.value))}
          >
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value={filteredStudents.length}>All</option>
          </select>
          
        </span>

        <Form.Group controlId="searchTerm" className="mb-0">
          <Form.Control
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '200px' }} // Adjust width as needed
          />
        </Form.Group>
      </div>

      <Table striped bordered hover responsive className="mt-4">
        <thead>
          <tr>
            <th>Roll No.</th>
            <th>Name</th>
            {subjects.map((subject) => (
              <th key={subject}>{subject}</th>
            ))}
            <th>Total Marks</th>
            <th>Average</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.length > 0 ? (
            currentRows.map((student) => {
              const { totalMarks, average } = calculateTotalAndAverage(student.marks);
              return (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  {subjects.map((subject) => (
                    <td key={subject}>{student.marks[subject]}</td>
                  ))}
                  <td>{totalMarks}</td>
                  <td>{average.toFixed(2)}</td>
                  <td>
                    <Button
                      className="rounded-pill  editbtn"
                      onClick={() => handleEditMarks(student)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDeleteStudent(student.id)}
                      className="rounded-pill  canceldel"
                    >
                      Delete
                    </Button>{" "}
                    <Button
                      variant="outline-success"
                      onClick={() => handleNotification(student)}
                      className="rounded-pill  savemodals"
                    >
                      Notify
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={subjects.length + 4} className="text-center">
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className="mt-3">
        <span>
          Showing {currentRows.length > 0 ? ((currentPage - 1) * rowsPerPage + 1) : 0} to {Math.min(currentPage * rowsPerPage, filteredStudents.length)} of {filteredStudents.length} entries
        </span>
      </div>

      <div className="d-flex justify-content-end mt-0">
        <Pagination>
          <Pagination.Prev 
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1} 
          >
            Previous
          </Pagination.Prev>
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next 
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages} 
          >
            Next
          </Pagination.Next>
        </Pagination>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Marks for {editStudent?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editStudent && (
            <div>
              {Object.keys(editStudent.marks).map((subject) => (
                <Form.Group key={subject}>
                  <Form.Label>{subject}</Form.Label>
                  <Form.Control
                    type="number"
                    value={editStudent.marks[subject]}
                    onChange={(e) => {
                      const updatedMarks = {
                        ...editStudent.marks,
                        [subject]: parseInt(e.target.value) || 0,
                      };
                      setEditStudent({ ...editStudent, marks: updatedMarks });
                    }}
                  />
                </Form.Group>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)} className="canceldel">
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateMarks} className="savemodals">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StudentPerformance;
