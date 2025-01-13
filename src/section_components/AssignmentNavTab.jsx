import React from "react";
import { Tabs, Tab } from "react-bootstrap";
import AddAssignment from "./AssignmentTracker";
import AssignmentData from "../reusable_components/AssignmentTable";
import "../css/dataTables.css";
import "../css/dataTable.css";
const AssignmentsNavTab = () => {
  return (
    <div style={{ backgroundColor: '#f5f7ff', padding: '30px', height: '100vh', borderRadius: '15px' }}>
      <h4 className="mb-4 text-center">Marks Reports</h4>

    <Tabs defaultActiveKey="Addassignment" id="marks-tabs">
     <Tab eventKey="Addassignment" title="Add Assignment">
          <div className="mt-3">
            <AddAssignment />
          </div>
        </Tab>
        <Tab eventKey="AssignmentData" title="Assignmnent Data">
          <div className="mt-3">
            <AssignmentData />
          </div>
        </Tab>
        </Tabs> 
        </div>
  );
};

export default AssignmentsNavTab;