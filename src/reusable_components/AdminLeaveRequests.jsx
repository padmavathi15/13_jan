import React, { useState } from 'react';
import { Table, Button, Badge, Pagination, Form } from 'react-bootstrap';

const AdminLeaveRequests = ({ leaveRequests, onUpdateStatus }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' for ascending, 'desc' for descending
  const [sortColumn, setSortColumn] = useState('teacherName'); // Default sorting by Teacher Name
  const requestsPerPage = 5;

  const handleAction = (id, status) => {
    onUpdateStatus(id, status);
  };

  const sortData = (column) => {
    const newSortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newSortDirection);
    setSortColumn(column);

    const sortedRequests = [...leaveRequests].sort((a, b) => {
      if (a[column] < b[column]) return newSortDirection === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return newSortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return sortedRequests;
  };

  // Pagination Logic
  const indexOfLastRequest = currentPage * requestsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
  const currentRequests = leaveRequests.slice(indexOfFirstRequest, indexOfLastRequest);
  const totalPages = Math.ceil(leaveRequests.length / requestsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title">Leave Requests</h4>
            <div className="row">
              <div className="col-12">
                <div className="table-responsive">
                  <div id="leave-requests-wrapper" className="dataTables_wrapper dt-bootstrap5 no-footer">
                    <div className="row">
                      <div className="col-sm-12 col-md-6">
                        <div className="dataTables_length" id="leave-requests-length">
                          <label>
                            Show 
                            <Form.Select size="sm" aria-controls="leave-requests">
                              <option value="5">5</option>
                              <option value="10">10</option>
                              <option value="15">15</option>
                              <option value="-1">All</option>
                            </Form.Select>
                            entries
                          </label>
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-6 d-flex justify-content-end">
                        <div id="leave-requests-filter" className="dataTables_filter">
                          <label>
                            <Form.Control type="search" placeholder="Search" aria-controls="leave-requests" />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="row dt-row">
                      <div className="col-sm-12">
                        <Table striped bordered hover responsive>
                          <thead className="table-dark">
                            <tr>
                              <th 
                                style={{ backgroundColor: 'white', color: 'black' }}
                                onClick={() => sortData('teacherName')}
                              >
                                Teacher Name {sortColumn === 'teacherName' && (sortDirection === 'asc' ? '↑' : '↓')}
                              </th>
                              <th 
                                style={{ backgroundColor: 'white', color: 'black' }}
                                onClick={() => sortData('leaveFrom')}
                              >
                                Leave From {sortColumn === 'leaveFrom' && (sortDirection === 'asc' ? '↑' : '↓')}
                              </th>
                              <th 
                                style={{ backgroundColor: 'white', color: 'black' }}
                                onClick={() => sortData('leaveTo')}
                              >
                                Leave To {sortColumn === 'leaveTo' && (sortDirection === 'asc' ? '↑' : '↓')}
                              </th>
                              <th 
                                style={{ backgroundColor: 'white', color: 'black' }}
                                onClick={() => sortData('reason')}
                              >
                                Reason {sortColumn === 'reason' && (sortDirection === 'asc' ? '↑' : '↓')}
                              </th>
                              <th 
                                style={{ backgroundColor: 'white', color: 'black' }}
                                onClick={() => sortData('status')}
                              >
                                Status {sortColumn === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                              </th>
                              <th 
                                style={{ backgroundColor: 'white', color: 'black' }}
                                onClick={() => sortData('actions')}
                              >
                                Actions
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentRequests.length > 0 ? (
                              currentRequests.map((request) => (
                                <tr key={request.id}>
                                  <td>{request.teacherName}</td>
                                  <td>{request.leaveFrom}</td>
                                  <td>{request.leaveTo}</td>
                                  <td>{request.reason}</td>
                                  <td>
                                    <Badge
                                      className="rounded-pill"
                                      bg={
                                        request.status === 'approved'
                                          ? 'success'
                                          : request.status === 'rejected'
                                          ? 'danger'
                                          : 'secondary'
                                      }
                                    >
                                      {request.status}
                                    </Badge>
                                  </td>
                                  <td>
                                    {request.status === 'pending' && (
                                      <>
                                        <Button
                                          size="sm"
                                          className="me-2 rounded-pill"
                                          style={{
                                            backgroundColor: 'white',
                                            color: 'blue',
                                            border: '1px solid blue',
                                          }}
                                          onClick={() => handleAction(request.id, 'approved')}
                                        >
                                          Approve
                                        </Button>
                                        <Button
                                          size="sm"
                                          className="rounded-pill"
                                          style={{
                                            backgroundColor: 'white',
                                            color: 'blue',
                                            border: '1px solid blue',
                                          }}
                                          onClick={() => handleAction(request.id, 'rejected')}
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
                                <td colSpan="6" className="text-center">
                                  No leave requests available.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-12 col-md-5">
                        <div className="dataTables_info" id="leave-requests-info" role="status" aria-live="polite">
                          Showing {indexOfFirstRequest + 1} to {Math.min(indexOfLastRequest, leaveRequests.length)} of {leaveRequests.length} entries
                        </div>
                      </div>
                      <div className="col-sm-12 col-md-7">
                        <div className="dataTables_paginate paging_simple_numbers">
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLeaveRequests;
