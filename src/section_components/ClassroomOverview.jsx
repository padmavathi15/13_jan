import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import MarksOverview from '../reusable_components/MarksOverview';
import AttendanceOverview from '../reusable_components/AttendanceOverview';
import  "../css/classoverview.css";

function ClassroomOverview() {
  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Classroom Overview</h2>
      <Tabs
        defaultActiveKey="Marks"
        id="classroom-overview-tabs"
       
      >
        {/* Marks Tab */}
        <Tab eventKey="Marks" title="Marks">
          <div className="mt-3">
            <MarksOverview />
          </div>
        </Tab>

        {/* Attendance Tab */}
        <Tab eventKey="Attendance" title="Attendance">
          <div className="mt-3">
            <AttendanceOverview />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default ClassroomOverview;
