import React, { useState } from 'react';
import TeacherLeaveRequest from '../reusable_components/TeacherLeaveRequest';
import AdminLeaveRequests from '../reusable_components/AdminLeaveRequests';
import LeaveRequestForm from '../reusable_components/LeaveveRequestForm';
import LeaveRequestsManagement from '../reusable_components/LeaveRequestsManagement';
const Leave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]); // Holds all leave requests

  // Function to handle new leave requests
  const handleLeaveRequestSubmit = (newRequest) => {
    setLeaveRequests((prevRequests) => [...prevRequests, newRequest]);
  };

  // Function to update the status of a leave request
  const updateLeaveRequestStatus = (id, status) => {
    setLeaveRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status } : request
      )
    );
  };

  return (
    <div>
      <h2 style={{marginTop:"20px"}}>Leave Management System</h2>
      <LeaveRequestForm/>
      <LeaveRequestsManagement/>
      <TeacherLeaveRequest onSubmit={handleLeaveRequestSubmit} />
      <AdminLeaveRequests
        leaveRequests={leaveRequests}
        onUpdateStatus={updateLeaveRequestStatus}
      />
    </div>
  );
};

export default Leave;
