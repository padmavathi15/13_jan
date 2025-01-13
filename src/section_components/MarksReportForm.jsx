import React, { useState } from "react";
import { Tab, Tabs, Alert } from "react-bootstrap";
import MonthlyReport from "./MonthlyReports";
import QuarterlyReport from "./QuarterlyReport";
import FinalExamReport from "./FinalExamReport";
import '../reusable_components/dataTable.css';

const MarksReportForm = () => {
  const [error, setError] = useState(""); // Define the error state

  return (
    <div className="page-wrapper">
      <div className="container">
        <h4 className="mb-4 text-center">Marks Reports</h4>
        {error && <Alert variant="danger">{error}</Alert>} {/* Show error if it exists */}

        <Tabs defaultActiveKey="monthlyReport" id="marks-tabs">
          <Tab eventKey="monthlyReport" title="Monthly Report">
            <div className="mt-3">
              <MonthlyReport />
            </div>
          </Tab>
          <Tab eventKey="quarterlyReport" title="Quarterly Report">
            <div className="mt-3">
              <QuarterlyReport />
            </div>
          </Tab>
          <Tab eventKey="finalExamReport" title="Final Exam Report">
            <div className="mt-3">
              <FinalExamReport />
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default MarksReportForm;
