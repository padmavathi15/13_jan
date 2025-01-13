import React, { useState } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";

const MarksOverview = () => {
    const [marksData, setMarksData] = useState([
        { studentId: 1, studentName: "Kuldeep", subject: "Maths", marks: 90, class: "10", section: "A" },
        { studentId: 2, studentName: "Teja", subject: "Science", marks: 80, class: "10", section: "B" },
        { studentId: 3, studentName: "Manisha", subject: "History", marks: 85, class: "9", section: "A" },
        { studentId: 4, studentName: "Swathi", subject: "Geography", marks: 75, class: "9", section: "B" },
        { studentId: 5, studentName: "Priya", subject: "Physics", marks: 88, class: "10", section: "A" },
        { studentId: 6, studentName: "Avinash", subject: "Chemistry", marks: 92, class: "9", section: "B" },
        { studentId: 7, studentName: "Padma", subject: "Maths", marks: 60, class: "10", section: "A" },
        { studentId: 8, studentName: "Supriya", subject: "Biology", marks: 78, class: "10", section: "B" },
        { studentId: 9, studentName: "Nivetha", subject: "Computer Science", marks: 95, class: "9", section: "A" },
        { studentId: 10, studentName: "Mahesh", subject: "History", marks: 82, class: "9", section: "B" },
    ]);

    const [classSectionData, setClassSectionData] = useState({
        classes: ["9", "10"],
        sections: ["A", "B"],
        subjects: ["Maths", "Science", "History", "Geography", "Physics", "Chemistry", "Biology", "Computer Science"]
    });

    const [selectedClass, setSelectedClass] = useState("");
    const [selectedSection, setSelectedSection] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: "marks", direction: "asc" });
    const [currentPage, setCurrentPage] = useState(1);
    const [marksPerPage, setMarksPerPage] = useState(5);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [modalData, setModalData] = useState({
        studentId: "",
        studentName: "",
        subject: "",
        marks: "",
        class: "",
        section: ""
    });
    const [errors, setErrors] = useState({});
    const [alertMessage, setAlertMessage] = useState("");

    const openModal = (type, data = null) => {
        setModalType(type);
        setModalData(data || {
            studentId: "",
            studentName: "",
            subject: "",
            marks: "",
            class: "",
            section: ""
        });
        setErrors({});
        setIsModalOpen(true);
    };

    const validateModalData = () => {
        const newErrors = {};
        if (!modalData.studentName) newErrors.studentName = "Student name is required.";
        if (!modalData.subject) newErrors.subject = "Subject is required.";
        if (!modalData.marks || modalData.marks <= 0) newErrors.marks = "Marks must be greater than 0.";
        if (!modalData.class) newErrors.class = "Class is required.";
        if (!modalData.section) newErrors.section = "Section is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateModalData()) return;

        const confirmationMessage = modalType === "addMarks" ? 
            "Are you sure you want to save this data?" : 
            "Are you sure you want to save your changes?";
        
        if (window.confirm(confirmationMessage)) {
            if (modalType === "addMarks") {
                setMarksData(prevMarksData => [
                    ...prevMarksData, 
                    { ...modalData, studentId: prevMarksData.length ? Math.max(prevMarksData.map(m => m.studentId)) + 1 : 1 },
                ]);
                setAlertMessage("Data added successfully!");
            } else if (modalType === "editMarks") {
                setMarksData(prevMarksData =>
                    prevMarksData.map(student => (student.studentId === modalData.studentId ? modalData : student))
                );
                setAlertMessage("Data updated successfully!");
            }
            setIsModalOpen(false);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            setMarksData(prevMarksData => prevMarksData.filter(student => student.studentId !== id));
            setAlertMessage("Data deleted successfully!");
        }
    };

    const handleResetFilters = () => {
        if (window.confirm("Are you sure you want to reset all filters?")) {
            setSelectedClass("");
            setSelectedSection("");
            setSearchQuery("");
        }
    };

    const filteredData = marksData.filter(item => {
        const matchesClass = selectedClass ? item.class === selectedClass : true;
        const matchesSection = selectedSection ? item.section === selectedSection : true;
        const matchesSearchQuery = searchQuery
            ? item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.subject.toLowerCase().includes(searchQuery.toLowerCase())
            : true;
        return matchesClass && matchesSection && matchesSearchQuery;
    });

    const sortedData = [...filteredData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
    });

    const totalEntries = filteredData.length;
    const totalPages = Math.ceil(totalEntries / marksPerPage);
    const indexOfLastMark = currentPage * marksPerPage;
    const indexOfFirstMark = indexOfLastMark - marksPerPage;
    const currentData = sortedData.slice(indexOfFirstMark, indexOfLastMark);

    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const handleEntriesChange = (e) => {
        setMarksPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to first page when changing entries per page
    };

    return (
        <div className="container mt-4 bg-light text-dark">
            <h4 className="mb-4">Marks Overview</h4>

            {alertMessage && <div className="alert alert-success">{alertMessage}</div>}

            <Button className="mb-3 rounded-pill" onClick={() => openModal("addMarks")}>Add Marks</Button>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-group mr-3">
                    <label>Class:</label>
                    <Form.Control 
                        as="select" 
                        value={selectedClass} 
                        onChange={(e) => setSelectedClass(e.target.value)}
                    >
                        <option value="">Select Class</option>
                        {classSectionData.classes.map((classItem) => (
                            <option key={classItem} value={classItem}>
                                {classItem}
                            </option>
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
                            <option key={section} value={section}>
                                {section}
                            </option>
                        ))}
                    </Form.Control>
                </div>

                <Button className="btn btn-primary" onClick={handleResetFilters}>
                    Reset Filter
                </Button>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="mr-3">
                    <label>Show entries:</label>
                    <Form.Control as="select" value={marksPerPage} onChange={handleEntriesChange} className="w-auto d-inline">
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

            <div id="order-listing_wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer" style={{ overflowY: 'auto', maxHeight: '400px', backgroundColor: 'white', borderRadius: '15px', padding: '20px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <table id="order-listing" className="table dataTable no-footer" aria-describedby="order-listing_info" style={{ backgroundColor: 'white', borderRadius: '15px', overflow: 'hidden' }}>
                    <thead className="custom-table-header">
                        <tr>
                            <th onClick={() => requestSort("studentId")}>Student ID</th>
                            <th onClick={() => requestSort("studentName")}>Student Name</th>
                            <th onClick={() => requestSort("subject")}>Subject</th>
                            <th onClick={() => requestSort("marks")}>Marks</th>
                            <th onClick={() => requestSort("class")}>Class</th>
                            <th onClick={() => requestSort("section")}>Section</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((student) => (
                            <tr key={student.studentId}>
                                <td>{student.studentId}</td>
                                <td>{student.studentName}</td>
                                <td>{student.subject}</td>
                                <td>{student.marks}</td>
                                <td>{student.class}</td>
                                <td>{student.section}</td>
                                <td>
                                    <Button variant="success" className="rounded-pill edit" onClick={() => openModal("editMarks", student)}>Edit</Button>
                                    <Button variant="danger" className="rounded-pill delete" onClick={() => handleDelete(student.studentId)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination-wrapper d-flex justify-content-between align-items-center mt-4">
                <div>
                    <span>
                        Showing {indexOfFirstMark + 1} to {Math.min(indexOfLastMark, totalEntries)} of {totalEntries} entries
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
                                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                                }}
                            >
                                Previous
                            </a>
                        </li>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <li
                                key={index + 1}
                                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                            >
                                <a
                                    className="page-link"
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage(index + 1);
                                    }}
                                >
                                    {index + 1}
                                </a>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <a
                                className="page-link"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                                }}
                            >
                                Next
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalType === "addMarks" ? "Add Marks" : "Edit Marks"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="studentName">
                            <Form.Label>Student Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={modalData.studentName}
                                onChange={(e) => setModalData({ ...modalData, studentName: e.target.value })}
                                isInvalid={!!errors.studentName}
                            />
                            <Form.Control.Feedback type="invalid">{errors.studentName}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="subject">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control
                                type="text"
                                value={modalData.subject}
                                onChange={(e) => setModalData({ ...modalData, subject: e.target.value })}
                                isInvalid={!!errors.subject}
                            />
                            <Form.Control.Feedback type="invalid">{errors.subject}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="marks">
                            <Form.Label>Marks</Form.Label>
                            <Form.Control
                                type="number"
                                value={modalData.marks}
                                onChange={(e) => setModalData({ ...modalData, marks: e.target.value })}
                                isInvalid={!!errors.marks}
                            />
                            <Form.Control.Feedback type="invalid">{errors.marks}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="class">
                            <Form.Label>Class</Form.Label>
                            <Form.Control
                                as="select"
                                value={modalData.class}
                                onChange={(e) => setModalData({ ...modalData, class: e.target.value })}
                                isInvalid={!!errors.class}
                            >
                                <option value="">Select Class</option>
                                {classSectionData.classes.map((classItem) => (
                                    <option key={classItem} value={classItem}>{classItem}</option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.class}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="section">
                            <Form.Label>Section</Form.Label>
                            <Form.Control
                                as="select"
                                value={modalData.section}
                                onChange={(e) => setModalData({ ...modalData, section: e.target.value })}
                                isInvalid={!!errors.section}
                            >
                                <option value="">Select Section</option>
                                {classSectionData.sections.map((section) => (
                                    <option key={section} value={section}>{section}</option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">{errors.section}</Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MarksOverview;