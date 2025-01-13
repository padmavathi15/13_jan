import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table, Alert } from "react-bootstrap";
import Swal from "sweetalert2"; // Import SweetAlert
import "../section_components/index.css";

const AttendanceOverview = () => {
  const [attendanceData, setAttendanceData] = useState([
    { studentId: 1, studentName: "Kuldeep", class: "10", section: "A", status: "Present" },
    { studentId: 2, studentName: "Teja", class: "10", section: "B", status: "Absent" },
    { studentId: 3, studentName: "Manisha", class: "9", section: "A", status: "Present" },
    { studentId: 4, studentName: "Swathi", class: "9", section: "B", status: "Absent" },
    { studentId: 5, studentName: "Priya", class: "8", section: "A", status: "Present" },
    { studentId: 6, studentName: "Supriya", class: "8", section: "B", status: "Absent" },
    { studentId: 7, studentName: "Mahesh", class: "10", section: "A", status: "Present" },
    { studentId: 8, studentName: "Avinash", class: "10", section: "B", status: "Absent" },
    { studentId: 9, studentName: "Padma", class: "9", section: "A", status: "Present" },
    { studentId: 10, studentName: "Nivetha", class: "9", section: "B", status: "Absent" },
  ]);

  const [classSectionData, setClassSectionData] = useState({
    classes: ["8", "9", "10"],
    sections: ["A", "B", "C"],
  });

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "studentId", direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [attendancePerPage, setAttendancePerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState({ studentId: "", studentName: "", class: "", section: "", status: "Present" });
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormChanged, setIsFormChanged] = useState(false); // Track form changes

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!modalData.studentName) newErrors.studentName = "Student Name is required.";
    if (!modalData.class) newErrors.class = "Class is required.";
    if (!modalData.section) newErrors.section = "Section is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (modalType === "addAttendance" || modalType === "editAttendance") {
      setIsFormChanged(true); // Mark as changed when opening modal
    }
  }, [modalType]);

  const openModal = (type, data = null) => {
    setModalType(type);
    setModalData(data || { studentId: "", studentName: "", class: "", section: "", status: "Present" });
    setErrors({}); // Clear errors on modal open
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    Swal.fire({
      title: 'Confirmation',
      text: "Are you sure you want to save this data?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        if (modalType === "addAttendance") {
          setAttendanceData([...attendanceData, { ...modalData, studentId: attendanceData.length ? attendanceData[attendanceData.length - 1].studentId + 1 : 1 }]);
        } else if (modalType === "editAttendance") {
          setAttendanceData(attendanceData.map((student) => (student.studentId === modalData.studentId ? modalData : student)));
        }
        setIsModalOpen(false);
        showSuccessAlert("Changes saved successfully!");
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    }).then((result) => {
      if (result.isConfirmed) {
        setAttendanceData(attendanceData.filter((student) => student.studentId !== id));
        showSuccessAlert("Record deleted successfully!");
      }
    });
  };

  const filteredData = attendanceData.filter((item) => {
    const matchesClass = selectedClass ? item.class === selectedClass : true;
    const matchesSection = selectedSection ? item.section === selectedSection : true;
    const matchesSearchQuery = searchQuery
      ? item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesClass && matchesSection && matchesSearchQuery;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const totalEntries = filteredData.length;
  const totalPages = Math.ceil(totalEntries / attendancePerPage);
  const indexOfLastAttendance = currentPage * attendancePerPage;
  const indexOfFirstAttendance = indexOfLastAttendance - attendancePerPage;
  const currentData = sortedData.slice(indexOfFirstAttendance, indexOfLastAttendance);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleEntriesChange = (e) => {
    setAttendancePerPage(e.target.value);
    setCurrentPage(1); // Reset to the first page when changing entries per page
  };

  const resetFilters = () => {
    setIsResetModalOpen(true); // Open confirmation modal for reset
  };

  const confirmReset = () => {
    setSelectedClass("");
    setSelectedSection("");
    setSearchQuery("");
    setIsResetModalOpen(false);
    showSuccessAlert("Filters reset successfully!");
  };

  const cancelReset = () => {
    setIsResetModalOpen(false);
  };

  const handleModalClose = () => {
    if (isFormChanged && !window.confirm("Are you sure you want to discard your changes?")) {
      return;
    }
    setIsModalOpen(false);
  };

  const showSuccessAlert = (message) => {
    Swal.fire({
      title: 'Success!',
      text: message,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  };

  return (
    <div className="container mt-4 bg-light text-dark">
      <h4 className="mb-4">Attendance Overview</h4>

      <Button className="mb-3 rounded-pill resetbtn" onClick={() => openModal("addAttendance")}>Add Attendance</Button>

      {/* Filters Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="form-group mr-3">
          <label>Class:</label>
          <Form.Control as="select" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option value="">Select Class</option>
            {classSectionData.classes.map((classItem) => (
              <option key={classItem} value={classItem}>{classItem}</option>
            ))}
          </Form.Control>
        </div>

        <div className="form-group mr-3">
          <label>Section:</label>
          <Form.Control as="select" value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)}>
            <option value="">Select Section</option>
            {classSectionData.sections.map((section) => (
              <option key={section} value={section}>{section}</option>
            ))}
          </Form.Control>
        </div>

        <div className="form-group">
          <Button className="btn btn-primary rounded-pill resetbtn" onClick={resetFilters}>Reset Filter</Button>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="mr-3">
          <label>Show entries:</label>
          <Form.Control as="select" value={attendancePerPage} onChange={handleEntriesChange} className="w-auto d-inline">
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={totalEntries}>All</option>
          </Form.Control>
        </div>

        <div className="ml-auto d-flex align-items-center">
          <label className="mr-2">Search:</label>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Table Section */}
      <table id="order-listing" className="table custom-table dataTable no-footer" aria-describedby="order-listing_info">
        <thead className="custom-table-header">
          <tr>
            <th onClick={() => requestSort("studentId")}>Student ID</th>
            <th onClick={() => requestSort("studentName")}>Student Name</th>
            <th onClick={() => requestSort("class")}>Class</th>
            <th onClick={() => requestSort("section")}>Section</th>
            <th onClick={() => requestSort("status")}>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((student) => (
            <tr key={student.studentId}>
              <td>{student.studentId}</td>
              <td>{student.studentName}</td>
              <td>{student.class}</td>
              <td>{student.section}</td>
              <td>{student.status}</td>
              <td>
                <Button variant="warning" className="mr-2 rounded-pill edit" onClick={() => openModal("editAttendance", student)}>Edit</Button>
                <Button variant="danger" className="rounded-pill delete" onClick={() => handleDelete(student.studentId)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Section */}
      <div className="pagination-wrapper d-flex justify-content-between align-items-center mt-4">
        <div>
          <span>
            Showing {indexOfFirstAttendance + 1} to{" "}
            {Math.min(indexOfLastAttendance, totalEntries)} of {totalEntries} entries
          </span>
        </div>
        <div>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage((prev) => prev - 1);
                }}
              >
                Previous
              </a>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                key={i + 1}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i + 1);
                  }}
                >
                  {i + 1}
                </a>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
                }}
              >
                Next
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Modal for Add/Edit Attendance */}
      {isModalOpen && (
        <Modal show onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalType === "addAttendance" ? "Add Attendance" : "Edit Attendance"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Student Name</Form.Label>
                <Form.Control
                  type="text"
                  value={modalData.studentName}
                  onChange={(e) => setModalData({ ...modalData, studentName: e.target.value })}
                />
                {errors.studentName && <Alert variant="danger">{errors.studentName}</Alert>}
              </Form.Group>
              <Form.Group>
                <Form.Label>Class</Form.Label>
                <Form.Control
                  as="select"
                  value={modalData.class}
                  onChange={(e) => setModalData({ ...modalData, class: e.target.value })}
                >
                  <option value="">Select Class</option>
                  {classSectionData.classes.map((classItem) => (
                    <option key={classItem} value={classItem}>{classItem}</option>
                  ))}
                </Form.Control>
                {errors.class && <Alert variant="danger">{errors.class}</Alert>}
              </Form.Group>
              <Form.Group>
                <Form.Label>Section</Form.Label>
                <Form.Control
                  as="select"
                  value={modalData.section}
                  onChange={(e) => setModalData({ ...modalData, section: e.target.value })}
                >
                  <option value="">Select Section</option>
                  {classSectionData.sections.map((section) => (
                    <option key={section} value={section}>{section}</option>
                  ))}
                </Form.Control>
                {errors.section && <Alert variant="danger">{errors.section}</Alert>}
              </Form.Group>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={modalData.status}
                  onChange={(e) => setModalData({ ...modalData, status: e.target.value })}
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary cancelbtn" onClick={handleModalClose}>Cancel</Button>
            <Button variant="primary cancelbtn " onClick={handleSubmit}>Save</Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Reset Filters Confirmation Modal */}
      {isResetModalOpen && (
        <Modal show onHide={cancelReset}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Reset</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure you want to reset all filters?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelReset}>Cancel</Button>
            <Button variant="danger" onClick={confirmReset}>Reset</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default AttendanceOverview;