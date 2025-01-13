import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Card,
    Table,
    Button,
    Dropdown,
    ProgressBar,
    Image
} from "react-bootstrap";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../css/teacherDasboard.css";
const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatTime = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleTimeString([], options);
};

const TeacherDashboard = () => {
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [schedule, setSchedule] = useState([
        { time: "9:00 AM - 10:00 AM", date: "2025-01-07", class: 6, subject: "Math" },
        { time: "10:15 AM - 11:15 AM", date: "2025-01-07", class: 7, subject: "Science" },
        { time: "11:30 AM - 12:30 PM", date: "2025-01-07", class: 8, subject: "English" },
        { time: "9:00 AM - 10:00 AM", date: "2025-01-08", class: 6, subject: "Social" },
        { time: "10:15 AM - 11:15 AM", date: "2025-01-08", class: 7, subject: "Computer Science" },
    ]);
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const classes = [1, 2, 3, 4, 5, 6, 7, 8];

    const teachers = [
        { 
            name: "Padma", 
            subject: "Math", 
            email: "padma@2025.com", 
            imageUrl: "https://www.freeiconspng.com/thumbs/teacher-png/high-resolution-teacher-png-icon-20.png" 
        },
        { 
            name: "Hameed", 
            subject: "Science", 
            email: "hameed@2025.com", 
            imageUrl: "https://img.pikbest.com/png-images/20241202/boy-profile-photo-cartoon_11152300.png" 
        },
        { 
            name: "Akhila", 
            subject: "English", 
            email: "akhila@2025.com", 
            imageUrl: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/e48cd8b6-d0dd-4b60-8ef6-ad3aae616a33/38776c76-b716-4cc7-ad29-3b3c6ed41f15.png" 
        },
        { 
            name: "Likhita", 
            subject: "Social", 
            email: "likhitha@2025.com", 
            imageUrl: "https://cdn-icons-png.flaticon.com/512/8065/8065344.png" 
        },
        { 
            name: "Rahul", 
            subject: "Computer Science", 
            email: "rahul@2025.com", 
            imageUrl: "https://cdn-icons-png.flaticon.com/512/2479/2479880.png" 
        },
    ];

    const performanceData = {
        1: { Math: 75, Science: 80, English: 70, Social: 65, ComputerScience: 90 },
        2: { Math: 85, Science: 88, English: 80, Social: 72, ComputerScience: 92 },
        3: { Math: 90, Science: 87, English: 85, Social: 80, ComputerScience: 93 },
        4: { Math: 78, Science: 82, English: 72, Social: 68, ComputerScience: 89 },
        5: { Math: 88, Science: 85, English: 80, Social: 74, ComputerScience: 91 },
        6: { Math: 92, Science: 94, English: 88, Social: 84, ComputerScience: 95 },
        7: { Math: 80, Science: 78, English: 75, Social: 70, ComputerScience: 88 },
        8: { Math: 86, Science: 83, English: 81, Social: 78, ComputerScience: 90 },
    };

    const handleAttendanceSubmit = (status) => {
        const today = new Date();
        const todayDate = today.toLocaleDateString();
        const currentTime = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const isAlreadyMarked = attendanceHistory.some(
            (record) => new Date(record.date).toLocaleDateString() === todayDate
        );

        if (!isAlreadyMarked && selectedTeacher) {
            setAttendanceHistory([ 
                ...attendanceHistory, 
                { date: todayDate, time: currentTime, status: status, teacher: selectedTeacher.name }
            ]);
        } else {
            alert("Attendance for today has already been marked.");
        }
    };

    const handleClassSelect = (classNumber) => {
        setSelectedClass(classNumber);
    };

    const handleTeacherSelect = (teacher) => {
        setSelectedTeacher(teacher);
        setSelectedClass(null); // Reset selected class when selecting a new teacher
    };

    const filteredSchedule = selectedTeacher
        ? schedule.filter(entry => entry.subject === selectedTeacher.subject)
        : [];

    return (
        <Container fluid style={{ backgroundColor: "#ffffff", minHeight: "100vh", padding: "20px" }}>
            {/* Teacher Selection */}
            <Row className="mb-4 align-items-center">
                <Col>
                    <Dropdown onSelect={(teacher) => handleTeacherSelect(JSON.parse(teacher))}>
                        <Dropdown.Toggle className="custom-class-select">
                            {selectedTeacher ? `${selectedTeacher.name} (${selectedTeacher.subject})` : "Select Teacher"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {teachers.map((teacher, index) => (
                                <Dropdown.Item key={index} eventKey={JSON.stringify(teacher)}>
                                    {teacher.name} ({teacher.subject})
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>

            {/* Welcome Header */}
            <Row className="mb-4 align-items-center">
                <Col>
                    <h1 style={{ fontSize: "18px", fontWeight: "bold" }}>Welcome to {selectedTeacher ? selectedTeacher.name : "the Teacher Dashboard"}</h1>
                    <p style={{ fontSize: "16px", color: "#4b49ac" }}>Teacher Dashboard</p>
                </Col>
            </Row>

            {/* Teacher Info */}
            {selectedTeacher && (
                <Row className="mb-4 align-items-center">
                    <Col>
                        <Image src={selectedTeacher.imageUrl} rounded style={{ width: "80px", height: "100px" }} />
                        <h6 className="d-inline ms-2">{selectedTeacher.name}</h6>
                        <p className="text-muted mb-1">{selectedTeacher.subject}</p>
                        <p className="text-muted mb-1">{selectedTeacher.email}</p>
                    </Col>
                </Row>
            )}

            {/* Attendance Buttons */}
            <Row className="mb-4 justify-content-end">
                <Col className="text-end">
                    <Button
                        className="custom-present-btn me-2"
                        onClick={() => handleAttendanceSubmit("Present")}
                    >
                        Present
                    </Button>
                    <Button
                        className="custom-absent-btn"
                        onClick={() => handleAttendanceSubmit("Absent")}
                    >
                        Absent
                    </Button>
                </Col>
            </Row>

            {/* Event Calendar */}
            <Row className="mb-4">
                <Col>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>Event Calendar</Card.Title>
                            <div style={{ width: "75%", margin: "0 auto" }}>
                                <FullCalendar
                                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                    initialView="dayGridMonth"
                                    events={filteredSchedule.map((entry) => ({
                                        title: `${entry.class} - ${entry.subject}`,
                                        date: entry.date,
                                    }))}
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Class Performance */}
            <Row className="mb-4">
                <Col>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>Class Performance</Card.Title>
                            <Dropdown onSelect={handleClassSelect}>
                                <Dropdown.Toggle className="custom-class-select">
                                    {selectedClass ? `Class ${selectedClass}` : "Select Class"}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {classes.map((classNumber) => (
                                        <Dropdown.Item key={classNumber} eventKey={classNumber}>
                                            Class {classNumber}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            {selectedClass && (
                                <Table bordered hover size="sm" className="mt-3 custom-table-style text-center">
                                    <thead className="custom-table-header">
                                        <tr>
                                            <th>Subject</th>
                                            <th>Performance (%)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(performanceData[selectedClass]).map((subject, index) => (
                                            selectedTeacher.subject === subject && (
                                                <tr key={index}>
                                                    <td>{subject}</td>
                                                    <td>
                                                        <ProgressBar
                                                            now={performanceData[selectedClass][subject]}
                                                            label={`${performanceData[selectedClass][subject]}%`}
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Class Schedule */}
            <Row className="mb-4">
                <Col>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>Class Schedule</Card.Title>
                            <Table bordered hover size="sm" className="custom-table-style text-center" style={{ borderCollapse: 'collapse' }}>
                                <thead className="custom-table-header">
                                    <tr>
                                        <th>Time</th>
                                        <th>Date</th>
                                        <th>Class</th>
                                        <th>Subject</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredSchedule.map((entry, index) => (
                                        <tr key={index} style={{ borderBottom: 'none' }}>
                                            <td>{entry.time}</td>
                                            <td>{formatDate(entry.date)}</td>
                                            <td>{entry.class}</td>
                                            <td>{entry.subject}</td>
                                            <td>
                                                <Button
                                                    variant="warning"
                                                    size="sm"
                                                    className="rounded-pill edit"
                                                    onClick={() => console.log(`Reschedule ${entry.subject}`)}
                                                >
                                                    Reschedule
                                                </Button>
                                                <Button
                                                    variant="danger"
                                                    size="sm"
                                                    className="rounded-pill edit ms-2"
                                                    onClick={() => console.log(`Postpone ${entry.subject}`)}
                                                >
                                                    Postpone
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Attendance Records Table */}
            <Row className="mb-4">
                <Col>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title>Attendance Records</Card.Title>
                            <Table bordered hover size="sm" className="custom-table-style text-center">
                                <thead className="custom-table-header">
                                    <tr>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                        <th>Teacher</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendanceHistory.map((record, index) => (
                                        <tr key={index}>
                                            <td>{formatDate(record.date)}</td>
                                            <td>{record.time}</td>
                                            <td>{record.status}</td>
                                            <td>{record.teacher}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default TeacherDashboard;