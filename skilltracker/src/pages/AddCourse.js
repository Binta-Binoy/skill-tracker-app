import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './AddCourse.css';

const AddCourse = () => {
  const { id: skillId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    resource_type: "video",
    status: "not_started",
    hours_spent: 0,
    notes: "",
    difficulty: 1,
    platform: "youtube",
    url: ""
  });

    // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

   axios.post(
        'http://127.0.0.1:8000/addskill/', {// Change this endpoint if you're only adding a resource
         ...formData,
      skill: skillId },
        {
          headers: {
            Authorization: 'Token ' + token,
          }
        })
      .then((res) => {
      alert("Course added successfully!");
      navigate(`/courselist/${skillId}`);
    })
   .catch((err) => {
      console.error("Error adding course:", err);
      alert("Something went wrong.");
    });
  };

  return (
    <div className="add-skill-container">
      <div className="form-card">
        <h2 className="form-title">➕ Add New Learning Resource</h2>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Skill & Resource Info */}
          <div className="form-section">
            <h5 className="section-title">🎯 Skill & Resource Info</h5>
            <div className="form-grid">

     

              <div className="form-group">
                <label>Resource Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g., React Course by XYZ"
                  required
                />
              </div>

              <div className="form-group">
                <label>Platform</label>
                <select name="platform" value={formData.platform} onChange={handleChange} required>
                  <option value="" style={{ color: 'black' }} >Choose...</option>
                  <option value="youtube" style={{ color: 'black' }}>YouTube</option>
                  <option value="udemy" style={{ color: 'black' }}>Udemy</option>
                  <option value="coursera" style={{ color: 'black' }}>Coursera</option>
                  <option value="other" style={{ color: 'black' }}>Other</option>
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
            <textarea
              name="notes"
              rows="4"
              placeholder="Key insights, tips, or reminders..."
              value={formData.notes}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Submit */}
          <div className="submit-btn-container">
            <button type="submit">💾 Save Resource</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
