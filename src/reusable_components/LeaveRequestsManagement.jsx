import React, { useState } from "react";
import { Table, Button, Badge, Pagination, Form } from "react-bootstrap";

const LeaveRequestsManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      studentName: "John Doe",
      leaveFrom: "2024-12-20",
      leaveTo: "2024-12-22",
      reason: "Family Emergency",
      status: "pending",
    },
    {
      id: 2,
      studentName: "Jane Smith",
      leaveFrom: "2024-12-18",
      leaveTo: "2024-12-19",
      reason: "Medical Reasons",
      status: "pending",
    },
    ...Array.from({ length: 18 }, (_, i) => ({
      id: i + 3,
      studentName: `Student ${i + 3}`,
      leaveFrom: `2024-12-${(i % 28) + 1}`,
      leaveTo: `2024-12-${(i % 28) + 3}`,
      reason: `Reason ${i + 3}`,
      status: "pending",
    })),
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [requestsPerPage, setRequestsPerPage] = useState(5);

  const handleAction = (id, status) => {
    const updatedRequests = leaveRequests.map((request) =>
      request.id === id ? { ...request, status } : request
    );
    setLeaveRequests(updatedRequests);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const filteredRequests = leaveRequests.filter((request) =>
    Object.values(request).some((value) =>
      value.toString().toLowerCase().includes(searchQuery)
    )
  );

  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = filteredRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  const totalPages = Math.ceil(filteredRequests.length / requestsPerPage);

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="card">
          <div className="card-body">
            <h1
              className="text-center mb-4"
              style={{ marginTop: "20px", marginBottom: "40px" }}
            >
              Leave Management System
            </h1>
            <div className="d-flex flex-column align-items-start mb-3">
  <p style={{ marginBottom: "5px", fontSize: "14px" }}>Show entries</p>
  <Form.Select
    size="sm"
    style={{ width: "150px" }}
    value={requestsPerPage}
    onChange={(e) => setRequestsPerPage(parseInt(e.target.value))}
  >
    <option value="5">5</option>
    <option value="10">10</option>
    <option value="20">20</option>
    <option value={filteredRequests.length}>All</option>
  </Form.Select>
</div>

{/* Align search bar to the right */}
<div className="d-flex justify-content-end mb-3">
  <Form.Control
    type="search"
    placeholder="Search"
    value={searchQuery}
    onChange={handleSearch}
    style={{ width: "250px" }}
  />
</div>

            
                

            <div className="table-responsive">
              <Table bordered responsive="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Student Name</th>
                    <th>Leave From</th>
                    <th>Leave To</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRequests.length > 0 ? (
                    currentRequests.map((request, index) => (
                      <tr key={request.id}>
                        <td>{indexOfFirstRequest + index + 1}</td>
                        <td>{request.studentName}</td>
                        <td>{request.leaveFrom}</td>
                        <td>{request.leaveTo}</td>
                        <td>{request.reason}</td>
                        <td>
                          <Badge
                            bg={
                              request.status === "approved"
                                ? "success"
                                : request.status === "rejected"
                                ? "danger"
                                : "warning"
                            }
                          >
                            {request.status}
                          </Badge>
                        </td>
                        <td>
                          {request.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="rounded-pill"
                                onClick={() => handleAction(request.id, "approved")}
                                style={{
                                  backgroundColor: "white",
                                  color: "blue",
                                  border: "1px solid blue",
                                }}
                              >
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                className="ms-2 rounded-pill"
                                onClick={() => handleAction(request.id, "rejected")}
                                style={{
                                  backgroundColor: "white",
                                  color: "red",
                                  border: "1px solid red",
                                }}
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
                        No matching leave requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
              <div className="d-flex justify-content-center">
              <Pagination>
  <Pagination.Prev
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
  >
    Previous
  </Pagination.Prev>
  <Pagination.Next
    onClick={() =>
      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    }
    disabled={currentPage === totalPages}
  >
    Next
  </Pagination.Next>
</Pagination>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequestsManagement;
