import React from "react";

import ClassTestTimeTable from "./ClassTestTimetable";
import ClassExamTimeTable from "./ClassExamTimetable";
import { Tab, Tabs } from "react-bootstrap";

const ExamTimetableNavTab = () => {
  return (
    <div style={{ backgroundColor: '#f5f7ff', padding: '30px', height: '100vh', borderRadius: '15px' }}>
    <h4 className="mb-4 text-center">Marks Reports</h4>

  <Tabs defaultActiveKey="ClassTestTimeTable" id="test-tabs">
   <Tab eventKey="ClassTestTimeTable" title="ClassTestTimeTable">
        <div className="mt-3">
          <ClassTestTimeTable />
        </div>
      </Tab>
      <Tab eventKey="ClassExamTimeTable" title="ClassExamTimeTable">
        <div className="mt-3">
          <ClassExamTimeTable />
        </div>
      </Tab>
      </Tabs>
      </div>
  );
};

export default ExamTimetableNavTab;
