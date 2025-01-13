import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form, Table } from "react-bootstrap";
import { MdEdit, MdDelete } from 'react-icons/md';

const AttendanceOverview = () => {
  const [attendanceData, setAttendanceData] = useState([
    { studentId: 1, studentName: "Kuldeep", class: "10", section: "A", status: "Present" },
    { studentId: 2, studentName: "Teja", class: "10", section: "B", status: "Absent" },
    { studentId: 3, studentName: "Manisha", class: "9", section: "A", status: "Present" },
    { studentId: 4, studentName: "swathi", class: "9", section: "B", status: "Present" },
  ]);

  const [classSectionData, setClassSectionData] = useState({
    classes: ["9", "10"],
    sections: ["A", "B"],
  });

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [modalType, setModalType] = useState("");

  const [errors, setErrors] = useState({ studentName: "", class: "", section: "", status: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [attendancePerPage] = useState(5);

  const openModal = (type, data = null) => {
    setModalType(type);
    setModalData(data);
    setIsModalOpen(true);
  };

  const handleSubmit = (data) => {
    if (modalType === "addAttendance") {
      setAttendanceData([
        ...attendanceData,
        {
          ...data,
          studentId: attendanceData.length
            ? attendanceData[attendanceData.length - 1].studentId + 1
            : 1,
        },
      ]);
    } else if (modalType === "editAttendance") {
      setAttendanceData(attendanceData.map((student) => (student.studentId === data.studentId ? data : student)));
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setAttendanceData(attendanceData.filter((student) => student.studentId !== id));
  };

  const filterData = (data) => {
    return data.filter((item) => {
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
  };

  const paginateData = (data, perPage, currentPage) => {
    const startIndex = (currentPage - 1) * perPage;
    return data.slice(startIndex, startIndex + perPage);
  };

  const totalAttendancePages = Math.ceil(attendanceData.length / attendancePerPage);

  const resetFilters = () => {
    setSelectedClass("");
    setSelectedSection("");
    setSearchQuery("");
  };

  const handleFieldValidation = () => {
    const newErrors = { studentName: "", class: "", section: "", status: "" };

    if (!modalData.studentName) {
      newErrors.studentName = "Student name is required.";
    }
    if (!modalData.class) {
      newErrors.class = "Class is required.";
    }
    if (!modalData.section) {
      newErrors.section = "Section is required.";
    }
    if (!modalData.status) {
      newErrors.status = "Status is required.";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Attendance Overview</h4>

      <div className="d-flex justify-content-between mb-3">
        <Button
          variant="primary"
          className="mb-3"
          onClick={() => openModal("addAttendance")}
        >
          Add Attendance
        </Button>
      </div>

      <div className="d-flex mb-3">
        <div className="form-group mr-3">
          <label>Class:</label>
          <Form.Control
            as="select"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Select Class</option>
            {classSectionData.classes.map((classItem) => (
              <option key={classItem} value={classItem}>{classItem}</option>
            ))}
          </Form.Control>
        </div>

        <div className="form-group mr-3">
          <label>Section:</label>
          <Form.Control
            as="select"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="">Select Section</option>
            {classSectionData.sections.map((section) => (
              <option key={section} value={section}>{section}</option>
            ))}
          </Form.Control>
        </div>

        <div className="form-group ml-auto">
          <label>Search:</label>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Button variant="secondary" className="ml-3" onClick={resetFilters}>Reset Filters</Button>
      </div>

      <Table bordered className="table-striped" style={{ backgroundColor: "#f8f9fa" }}>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginateData(filterData(attendanceData), attendancePerPage, currentPage).map((student) => (
            <tr key={student.studentId}>
              <td>{student.studentId}</td>
              <td>{student.studentName}</td>
              <td>{student.class}</td>
              <td>{student.section}</td>
              <td>{student.status}</td>
              <td>
                <Button
                  style={{ backgroundColor: "#007BFF", borderColor: "#007BFF" }}
                  size="sm"
                  className="mr-2"
                  onClick={() => openModal("editAttendance", student)}
                >
                  <MdEdit />
                </Button>

                <Button
                  style={{ backgroundColor: "#FF4D4D", borderColor: "#FF4D4D" }}
                  size="sm"
                  onClick={() => handleDelete(student.studentId)}
                >
                  <MdDelete />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div>
        <Button
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span> Page {currentPage} of {totalAttendancePages} </span>
        <Button
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalAttendancePages))}
          disabled={currentPage === totalAttendancePages}
        >
          Next
        </Button>
      </div>

      <ModalComponent
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        modalType={modalType}
        initialData={modalData}
        errors={errors}
        handleFieldValidation={handleFieldValidation}
      />
    </div>
  );
};

const ModalComponent = ({ isOpen, onClose, onSubmit, modalType, initialData, errors, handleFieldValidation }) => {
  const [studentName, setStudentName] = useState("");
  const [classSelection, setClassSelection] = useState("");
  const [sectionSelection, setSectionSelection] = useState("");
  const [status, setStatus] = useState("Present");

  useEffect(() => {
    if (initialData) {
      setStudentName(initialData.studentName);
      setClassSelection(initialData.class);
      setSectionSelection(initialData.section);
      setStatus(initialData.status);
    } else {
      setStudentName("");
      setClassSelection("");
      setSectionSelection("");
      setStatus("Present");
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!handleFieldValidation()) return;

    const data = {
      studentId: initialData ? initialData.studentId : undefined,
      studentName,
      class: classSelection,
      section: sectionSelection,
      status,
    };
    onSubmit(data);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal show={isOpen} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{modalType === "editAttendance" ? "Edit Attendance" : "Add Attendance"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Student Name:</Form.Label>
            <Form.Control
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              isInvalid={errors.studentName}
            />
            {errors.studentName && <Form.Text className="text-danger">{errors.studentName}</Form.Text>}
          </Form.Group>

          <Form.Group>
            <Form.Label>Class:</Form.Label>
            <Form.Control
              as="select"
              value={classSelection}
              onChange={(e) => setClassSelection(e.target.value)}
              isInvalid={errors.class}
            >
              <option value="">Select Class</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </Form.Control>
            {errors.class && <Form.Text className="text-danger">{errors.class}</Form.Text>}
          </Form.Group>

          <Form.Group>
            <Form.Label>Section:</Form.Label>
            <Form.Control
              as="select"
              value={sectionSelection}
              onChange={(e) => setSectionSelection(e.target.value)}
              isInvalid={errors.section}
            >
              <option value="">Select Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
            </Form.Control>
            {errors.section && <Form.Text className="text-danger">{errors.section}</Form.Text>}
          </Form.Group>

          <Form.Group>
            <Form.Label>Status:</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              isInvalid={errors.status}
            >
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </Form.Control>
            {errors.status && <Form.Text className="text-danger">{errors.status}</Form.Text>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
        <Button variant="primary" onClick={handleSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AttendanceOverview;
