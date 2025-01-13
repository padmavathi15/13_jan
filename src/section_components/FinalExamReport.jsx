import React, { useState } from 'react';
import { Table, Button, Alert, Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2'; // Import SweetAlert2 for alert functionality
import { FaSortUp, FaSortDown, FaSort } from 'react-icons/fa';

const FinalExamReport = () => {
  const [studentId, setStudentId] = useState('');
  const [studentName, setStudentName] = useState('');
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'subject', direction: 'asc' });
  const [showAddMarksModal, setShowAddMarksModal] = useState(false);
  const [newMarks, setNewMarks] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const maxMarks = 100; // Updated max marks to 100
  const passMarks = Math.ceil(maxMarks * 0.4);
  const sampleSubjects = ['Math', 'Science', 'English', 'History', 'Geography'];

  const showSwal = (title, text, icon, callback) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed && callback) {
        callback();
      }
    });
  };

  const handleShowReport = () => {
    if (!studentId || !studentName || !className || !section) {
      setValidated(true);
      setError('Please fill all required fields to generate the report.');
      return;
    }

    showSwal(
      'Generate Report?',
      'Do you want to generate the final exam report?',
      'question',
      () => {
        setError('');
        setValidated(false);
        const generatedSubjects = sampleSubjects.map((subject) => {
          const marks = Math.floor(Math.random() * (maxMarks + 1));
          return { subject, marks, pass: marks >= passMarks };
        });
        setSubjects(generatedSubjects);
        setShowReport(true);
      }
    );
  };

  const handleSendReport = () => {
    showSwal(
      'Are you sure?',
      'Do you want to send the final exam report?',
      'question',
      () => {
        Swal.fire('Sent!', 'Final Exam Report sent successfully!', 'success');
      }
    );
  };

  const handleBackToForm = () => {
    showSwal(
      'Go Back?',
      'Are you sure you want to go back to the form?',
      'warning',
      () => {
        setStudentId('');
        setStudentName('');
        setClassName('');
        setSection('');
        setShowReport(false);
        setSubjects([]);
        setError('');
        setValidated(false);
      }
    );
  };

  const filteredSubjects = subjects.filter((subject) => {
    const lowercasedQuery = searchQuery.toLowerCase();
    return (
      subject.subject.toLowerCase().includes(lowercasedQuery) ||
      subject.marks.toString().includes(lowercasedQuery) ||
      (subject.pass ? 'pass' : 'fail').includes(lowercasedQuery)
    );
  });

  const sortData = (key) => {
    const newDirection = sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction: newDirection });

    const sortedData = [...subjects].sort((a, b) => {
      if (key === 'subject') {
        return sortConfig.direction === 'asc'
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      } else if (key === 'marks' || key === 'pass') {
        return sortConfig.direction === 'asc' ? a[key] - b[key] : b[key] - a[key];
      }
      return 0;
    });

    setSubjects(sortedData);
  };

  const handleAddMarks = () => {
    if (newMarks === '' || selectedSubject === '') {
      setError('Please select a subject and enter marks.');
      return;
    }

    showSwal(
      'Are you sure?',
      `Do you want to save ${newMarks} marks for ${selectedSubject}?`,
      'question',
      () => {
        setError('');
        setSubjects(subjects.map((subject) => {
          if (subject.subject === selectedSubject) {
            return { ...subject, marks: newMarks, pass: newMarks >= passMarks };
          }
          return subject;
        }));
        setShowAddMarksModal(false);
        setNewMarks('');
        setSelectedSubject('');
        Swal.fire('Success!', `${newMarks} marks added for ${selectedSubject}.`, 'success');
      }
    );
  };

  const handleShowAddMarksModal = (subject) => {
    setSelectedSubject(subject);
    setShowAddMarksModal(true);
  };

  return (
    <div style={{ backgroundColor: '#f5f7ff', padding: '30px', height: '100%', borderRadius: '15px' }}>
      <h4 className="text-center mb-4">Final Exam Report</h4>
      {error && <Alert variant="danger">{error}</Alert>}

      {!showReport && (
        <Form
          noValidate
          validated={validated}
          className="forms-sample mx-auto"
          style={{
            maxWidth: '400px',
            padding: '20px',
            backgroundColor: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div className="form-group mb-3">
            <Form.Label>Student ID</Form.Label>
            <Form.Select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
              isInvalid={validated && !studentId}
              className="form-control"
            >
              <option value="">Select Student ID</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">Student ID is required.</Form.Control.Feedback>
          </div>

          <div className="form-group mb-3">
            <Form.Label>Student Name</Form.Label>
            <Form.Select
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
              isInvalid={validated && !studentName}
              className="form-control"
            >
              <option value="">Select Student Name</option>
              <option value="Padma">Padma</option>
              <option value="Chaithra">Chaithra</option>
              <option value="Basu">Basu</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">Student Name is required.</Form.Control.Feedback>
          </div>

          <div className="form-group mb-3">
            <Form.Label>Class</Form.Label>
            <Form.Select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
              isInvalid={validated && !className}
              className="form-control"
            >
              <option value="">Select Class</option>
              <option value="10th">10th</option>
              <option value="11th">11th</option>
              <option value="12th">12th</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">Class is required.</Form.Control.Feedback>
          </div>

          <div className="form-group mb-3">
            <Form.Label>Section</Form.Label>
            <Form.Select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              required
              isInvalid={validated && !section}
              className="form-control"
            >
              <option value="">Select Section</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">Section is required.</Form.Control.Feedback>
          </div>

          <div className="form-group d-flex justify-content-between">
            <Button
              onClick={handleShowReport}
              className=" rounded-pill submitbtn"
            >
              Show Report
            </Button>
          </div>
        </Form>
      )}

      {showReport && (
        <div>
          {/* Displaying student details */}
          <div className="student-details mb-3">
            <p><strong>Student ID:</strong> {studentId}</p>
            <p><strong>Student Name:</strong> {studentName}</p>
            <p><strong>Class:</strong> {className}</p>
            <p><strong>Section:</strong> {section}</p>
          </div>

          <h5 className="mt-3">Marks Report</h5>

          <Form.Control
            type="search"
            placeholder="Search all columns"
            style={{ width: '200px', margin: '0 auto', marginLeft:'0px' }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-3"
          />

          <div className="table-responsive d-flex justify-content-center">
            <Table bordered hover className="custom-table text-center">
              <thead>
                <tr>
                  <th
                    onClick={() => sortData('subject')}
                    style={{ cursor: 'pointer', color: '#4b49ac', borderBottom: 'none' }}
                  >
                    Subject
                    {sortConfig.key === 'subject' &&
                      (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />) || <FaSort />}
                  </th>
                  <th
                    onClick={() => sortData('marks')}
                    style={{ cursor: 'pointer', color: '#4b49ac', borderBottom: 'none' }}
                  >
                    Marks
                    {sortConfig.key === 'marks' &&
                      (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />) || <FaSort />}
                  </th>
                  <th
                    onClick={() => sortData('pass')}
                    style={{ cursor: 'pointer', color: '#4b49ac', borderBottom: 'none' }}
                  >
                    Status
                    {sortConfig.key === 'pass' &&
                      (sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />) || <FaSort />}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubjects.map((subject, index) => (
                  <tr key={index}>
                    <td>{subject.subject}</td>
                    <td>{subject.marks}</td>
                    <td>{subject.pass ? 'Pass' : 'Fail'}</td>
                    <td>
                      <Button
                        variant="warning"
                        className="btn editbtn rounded-pill"
                        onClick={() => handleShowAddMarksModal(subject.subject)}
                      >
                        Edit Marks
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="mt-3 d-flex justify-content-center">
            <Button className="rounded-pill savemodals" onClick={handleSendReport}>
              Send Report
            </Button>{' '}
            <Button className="rounded-pill canceldel" onClick={handleBackToForm}>
              Back to Form
            </Button>
          </div>
        </div>
      )}

      {/* Add Marks Modal */}
      <Modal show={showAddMarksModal} onHide={() => setShowAddMarksModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Marks for {selectedSubject}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <Form.Label>Enter Marks</Form.Label>
            <Form.Control
              type="number"
              value={newMarks}
              onChange={(e) => setNewMarks(e.target.value)}
              min="0"
              max={maxMarks}
              placeholder={`Max: ${maxMarks}`}
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddMarksModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddMarks}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FinalExamReport;
