import React from 'react';
import './AddSkill.css';

const EditSkill = () => {
  return (
    <div className="add-skill-container">
      <div className="form-card">
        <h2 className="form-title">Edit Skill</h2>

        <form>
          {/* Section 1: Skill Details */}
          <div className="form-section">
            <h5 className="section-title">🎯 Skill Information</h5>
            <div className="form-grid">
              <div className="form-group">
                <label>Skill Name</label>
                <input type="text" placeholder="e.g., ReactJS" />
              </div>
              <div className="form-group">
                <label>Platform</label>
                <select>
                  <option style={{ color: 'black' }}>Choose...</option>
                  <option style={{ color: 'black' }}>Udemy</option>
                  <option style={{ color: 'black' }}>Coursera</option>
                  <option style={{ color: 'black' }}>YouTube</option>
                  <option style={{ color: 'black' }}>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Resource Type</label>
                <select>
                  <option style={{ color: 'black' }}>Course</option>
                  <option  style={{ color: 'black' }}>Video</option>
                  <option style={{ color: 'black' }}>Article</option>
                </select>
              </div>
              <div className="form-group">
                <label>Resource Link</label>
                <input type="url" placeholder="https://example.com" />
              </div>
            </div>
          </div>

          {/* Section 2: Progress Tracking */}
          <div className="form-section">
            <h5 className="section-title">📈 Progress Tracking</h5>
            <div className="form-grid">
              <div className="form-group">
                <label>Status</label>
                <select>
                  <option style={{ color: 'black' }}>Not Started</option>
                  <option style={{ color: 'black' }}>In Progress</option>
                  <option style={{ color: 'black' }}>Completed</option>
                </select>
              </div>
              <div className="form-group">
                <label>Hours Spent</label>
                <input type="number" min="0" placeholder="0" />
              </div>
              <div className="form-group">
                <label>Difficulty (1-5)</label>
                <input type="number" min="1" max="5" placeholder="1-Easy  5-Hard" />
              </div>
            </div>
          </div>

          {/* Section 3: Notes */}
          <div className="form-section">
            <h5 className="section-title">📝 Notes</h5>
            <textarea rows="4" placeholder="Key insights, tips, or reminders..."></textarea>
          </div>

          {/* Submit */}
          <div className="submit-btn-container">
            <button type="submit"> Update Skill</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSkill;
