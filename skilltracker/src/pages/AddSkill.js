import React from 'react';
import './AddSkill.css';
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddSkill = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    platform: '',
    resource_type: '',
    url: '',
    status: 'not_started',
    hours_spent: 0,
    difficulty: 1,
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("entered inside function")

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        'http://127.0.0.1:8000/addskill/',
        formData, {
          headers: {
            Authorization: 'Token ' + token,
          },
        });
      alert("Skill added successfully!");
      console.log("added to :")
      navigate("/skilllist");
    } catch (err) {
      console.error("Error adding skill:", err.response?.data || err.message);
      alert("Failed to add skill. Check console.");
    }
  };

  return (
    <div className="add-skill-container">
      <div className="form-card">
        <h2 className="form-title">➕ Add New Learning Goal</h2>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Skill Details */}
          <div className="form-section">
            <h5 className="section-title">🎯 Skill Information</h5>
            <div className="form-grid">
              <div className="form-group">
                <label>Skill Name</label>
                <input name="skill" value={formData.skill} onChange={handleChange} type="text" placeholder="e.g., ReactJS" required />
              </div>
              <div className="form-group">
                <label>Platform</label>
                <select name="platform" value={formData.platform} onChange={handleChange} required>
                  <option value="" style={{ color: 'black' }}>Choose...</option>
                  <option value="Udemy" style={{ color: 'black' }}>Udemy</option>
                  <option value="Coursera" style={{ color: 'black' }}>Coursera</option>
                  <option value="YouTube" style={{ color: 'black' }}>YouTube</option>
                  <option value="Other" style={{ color: 'black' }}>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Resource Type</label>
                <select name="resource_type" value={formData.resource_type} onChange={handleChange} required>
                  <option value="" style={{ color: 'black' }}>Choose...</option>
                  <option value="course" style={{ color: 'black' }}>Course</option>
                  <option value="video" style={{ color: 'black' }}>Video</option>
                  <option value="article" style={{ color: 'black' }}>Article</option>
                </select>
              </div>
              <div className="form-group">
                <label>Resource Link</label>
                <input name="url" value={formData.url} onChange={handleChange} type="url" placeholder="https://example.com" />
              </div>
            </div>
          </div>

          {/* Section 2: Progress Tracking */}
          <div className="form-section">
            <h5 className="section-title">📈 Progress Tracking</h5>
            <div className="form-grid">
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="not_started" style={{ color: 'black' }}>Not Started</option>
                  <option value="in_progress" style={{ color: 'black' }}>In Progress</option>
                  <option value="completed" style={{ color: 'black' }}>Completed</option>
                </select>
              </div>
              <div className="form-group">
                <label>Hours Spent</label>
                <input name="hours_spent" type="number" min="0" value={formData.hours_spent} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Difficulty (1-5)</label>
                <input name="difficulty" type="number" min="1" max="5" value={formData.difficulty} onChange={handleChange} placeholder="1-Easy  5-Hard" />
              </div>
            </div>
          </div>

          {/* Section 3: Notes */}
          <div className="form-section">
            <h5 className="section-title">📝 Notes</h5>
            <textarea name="notes" rows="4" placeholder="Key insights, tips, or reminders..." value={formData.notes} onChange={handleChange}></textarea>
          </div>

          {/* Submit */}
          <div className="submit-btn-container">
            <button type="submit">💾 Save Skill</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSkill;
