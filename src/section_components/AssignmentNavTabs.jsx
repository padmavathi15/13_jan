import React from "react";

const AssignmentsNavTab = ({ activeAssignmentTab, setActiveAssignmentTab }) => {
  return (
    <ul className="nav nav-tabs" id="assignmentTabs" role="tablist">
      <li className="nav-item">
        <a
          className={`nav-link ${activeAssignmentTab === "AddAssignment" ? "active" : ""}`}
          id="addAssignment-tab"
          href="#addAssignment"
          role="tab"
          aria-controls="addAssignment"
          aria-selected={activeAssignmentTab === "AddAssignment"}
          onClick={() => setActiveAssignmentTab("AddAssignment")}
        >
          Add Assignment
        </a>
      </li>
      <li className="nav-item">
        <a
          className={`nav-link ${activeAssignmentTab === "AssignmentData" ? "active" : ""}`}
          id="assignmentData-tab"
          href="#assignmentData"
          role="tab"
          aria-controls="assignmentData"
          aria-selected={activeAssignmentTab === "AssignmentData"}
          onClick={() => setActiveAssignmentTab("AssignmentData")}
        >
          Assignment Data
        </a>
      </li>
    </ul>
  );
};

export default AssignmentsNavTab;
