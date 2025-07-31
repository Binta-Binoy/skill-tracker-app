import React from 'react';
import './CalendarView.css';

const CalendarView = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="container py-5">
      <h2 className="text-center text-primary fw-bold mb-4">📅 Learning Calendar</h2>

      {/* Month Navigation */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <button className="btn btn-outline-secondary">← Prev</button>
        <h4 className="fw-semibold mb-0">July 2025</h4>
        <button className="btn btn-outline-secondary">Next →</button>
      </div>

      {/* Day Headers */}
      <div className="row text-center fw-bold text-secondary border-bottom pb-2 mb-2">
        {daysOfWeek.map(day => (
          <div className="col calendar-day-header" key={day}>
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="row g-2 calendar-grid">
        {Array.from({ length: 35 }, (_, i) => (
          <div className="col-12 col-sm-6 col-md-4 col-lg-2 calendar-cell" key={i}>
            <div className="cell-box border rounded p-2 position-relative bg-white shadow-sm">
              <div className="date-number text-muted small mb-1">{i + 1}</div>
              
              {/* Sample activity */}
              {(i === 4 || i === 10 || i === 17) && (
                <div className="activity bg-primary text-white rounded small p-1 mb-1">
                  🧠 Studied React
                </div>
              )}
              {(i === 12) && (
                <div className="activity bg-warning text-dark rounded small p-1 mb-1">
                  📝 Added Notes
                </div>
              )}
              {(i === 20) && (
                <div className="activity bg-success text-white rounded small p-1 mb-1">
                  ✔️ Completed HTML
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-5">
        <h6 className="text-secondary">Legend:</h6>
        <ul className="list-inline small">
          <li className="list-inline-item"><span className="badge bg-primary">🧠</span> Studied</li>
          <li className="list-inline-item"><span className="badge bg-success">✔️</span> Completed</li>
          <li className="list-inline-item"><span className="badge bg-warning text-dark">📝</span> Notes Added</li>
        </ul>
      </div>
    </div>
  );
};

export default CalendarView;
