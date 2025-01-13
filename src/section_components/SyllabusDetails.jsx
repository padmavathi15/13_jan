import React, { useState } from 'react';
import { Button, Card, Modal, Form, ListGroup } from 'react-bootstrap';
import '../reusable_components/dataTable.css';
const SyllabusDetails = () => {
  const initialSyllabus = {
    subject: '',
    subTopic: '',
    file: null,
    fileName: '',
    date: '',
  };

  const [classes, setClasses] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  });

  const [currentClass, setCurrentClass] = useState(null);
  const [syllabus, setSyllabus] = useState(initialSyllabus);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSyllabus((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleAddSyllabus = () => {
    if (!syllabus.subject || !syllabus.date || (!file && !syllabus.file)) {
      alert('Please fill all fields and upload a file.');
      return;
    }

    const newSyllabus = {
      ...syllabus,
      file: file || syllabus.file,
      fileName: fileName || syllabus.fileName,
      fileUrl: file ? URL.createObjectURL(file) : syllabus.fileUrl,
    };

    if (editIndex !== null) {
      const updatedClasses = { ...classes };
      updatedClasses[currentClass][editIndex] = newSyllabus;
      setClasses(updatedClasses);
      setEditIndex(null);
    } else {
      setClasses((prev) => ({
        ...prev,
        [currentClass]: [...prev[currentClass], newSyllabus],
      }));
    }

    setSyllabus(initialSyllabus);
    setFile(null);
    setFileName('');
    setShowModal(false);
  };

  const handleEditSyllabus = (classNumber, index) => {
    const syllabusToEdit = classes[classNumber][index];
    setSyllabus(syllabusToEdit);
    setFile(syllabusToEdit.file);
    setFileName(syllabusToEdit.fileName);
    setCurrentClass(classNumber);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDeleteSyllabus = (classNumber, index) => {
    const updatedClasses = { ...classes };
    updatedClasses[classNumber].splice(index, 1);
    setClasses(updatedClasses);
  };

  const handleOpenModal = (classNumber) => {
    setCurrentClass(classNumber);
    setSyllabus(initialSyllabus);
    setEditIndex(null);
    setShowModal(true);
  };

  const handleSendSyllabus = (syllabusItem) => {
    alert(`Syllabus Sent:\nSubject: ${syllabusItem.subject}\nDate: ${syllabusItem.date}\nFile: ${syllabusItem.fileName || 'No file uploaded'}`);
  };

  return (
    <div style={{ backgroundColor: '#dae7ff', padding: '30px', minHeight: '100vh' }}>
      <h3 className="text-center mb-4">Syllabus Details</h3>
      <div className="row">
        {Object.keys(classes).map((classNumber) => (
          <div className="col-md-4 mb-4" key={classNumber}>
            <Card>
              <Card.Header>
                <h5>Class {classNumber}</h5>
              </Card.Header>
              <Card.Body>
                {classes[classNumber].length === 0 ? (
                  <p>No syllabus added yet.</p>
                ) : (
                  <ListGroup variant="flush">
                    {classes[classNumber].map((syllabusItem, index) => (
                      <ListGroup.Item key={index} className="mb-3">
                        <strong>Subject:</strong> {syllabusItem.subject} <br />
                        <strong>Sub-Topic:</strong> {syllabusItem.subTopic || 'N/A'} <br />
                        <strong>Date:</strong> {syllabusItem.date} <br />
                        <strong>File:</strong>{' '}
                        <a href={syllabusItem.fileUrl} target="_blank" rel="noopener noreferrer">
                          Download {syllabusItem.fileName}
                        </a>
                        <div className="mt-2">
                          <Button
                            variant="warning"
                            size="sm"
                            className="me-2 rounded-pill editbtn"
                            onClick={() => handleEditSyllabus(classNumber, index)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            className="me-2 rounded-pill canceldel"
                            onClick={() => handleDeleteSyllabus(classNumber, index)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="success"
                            size="sm"
                            className="rounded-pill savemodals"
                            onClick={() => handleSendSyllabus(syllabusItem)}
                          >
                            Send
                          </Button>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
                <Button variant="primary" className="mt-3 rounded-pill submitbtn" onClick={() => handleOpenModal(classNumber)}>
                  Add Syllabus
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Edit Syllabus' : 'Add Syllabus'} for Class {currentClass}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                name="subject"
                value={syllabus.subject}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="subTopic">
              <Form.Label>Sub-Topic</Form.Label>
              <Form.Control
                type="text"
                name="subTopic"
                value={syllabus.subTopic}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={syllabus.date}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="file">
              <Form.Label>Upload File</Form.Label>
              <Form.Control type="file" onChange={handleFileChange} />
              {fileName && <small className="text-success mt-1">{fileName}</small>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="rounded-pill canceldel" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="success" className="rounded-pill savemodals" onClick={handleAddSyllabus}>
            {editIndex !== null ? 'Save Changes' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SyllabusDetails;
