import React from 'react';
import './Summary.css'; 

const Summary = () => {
  return (
    <div className="container-fluid py-5 bg-dark">
      <h2 className="text-center fw-bold mb-5 text-primary">📊 Skill Summary</h2>

      {/* Stat Boxes */}
      <div className="row text-center mb-5 g-4">
        <div className="col-md-4">
          <div className="card stat-card shadow-sm bg-warning">
            <div className="card-body">
              <h5 className="text-light">Total Skills</h5>
              <h2 className="fw-bold text-light">12</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card stat-card shadow-sm">
            <div className="card-body">
              <h5 className="text-muted">Hours Spent</h5>
              <h2 className="fw-bold text-info">47</h2>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card stat-card shadow-sm bg-success">
            <div className="card-body">
              <h5 className="text-light">Completed Skills</h5>
              <h2 className="fw-bold text-light">5</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="row mb-5">
        <div className="col-md-6 mx-auto">
          <div className="card p-4 shadow-sm">
            <h5 className="text-center text-primary mb-3">📂 Category Breakdown</h5>
            <div className="chart-placeholder text-muted text-center">
              [ Chart Placeholder (Pie or Bar) ]
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card p-4 shadow-sm mb-4">
        <h5 className="mb-3 text-primary">🕒 Recent Activity</h5>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Completed: <strong>HTML & CSS Basics</strong>
            <span className="badge bg-success rounded-pill">✔️</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Spent 2 hrs on <strong>React Hooks</strong>
            <span className="badge bg-info rounded-pill">+2h</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Added new skill: <strong>TypeScript</strong>
            <span className="badge bg-warning rounded-pill">🆕</span>
          </li>
        </ul>
      </div>

      {/* Tip/Quote */}
      <div className="alert alert-light border text-center mt-5">
        <em>“Small consistent steps lead to big results.”</em>
      </div>
    </div>
  );
};

export default Summary;
