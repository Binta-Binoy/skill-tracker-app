// import React from 'react';
// import './AddCourse.css';

// const EditSkill = () => {
//   return (
//     <div className="add-skill-container">
//       <div className="form-card">
//         <h2 className="form-title">Edit Skill</h2>

//         <form>
//           {/* Section 1: Skill Details */}
//           <div className="form-section">
//             <h5 className="section-title">🎯 Skill Information</h5>
//             <div className="form-grid">
//               <div className="form-group">
//                 <label>Skill Name</label>
//                 <input type="text" placeholder="e.g., ReactJS" />
//               </div>
//               <div className="form-group">
//                 <label>Platform</label>
//                 <select>
//                   <option style={{ color: 'black' }}>Choose...</option>
//                   <option style={{ color: 'black' }}>Udemy</option>
//                   <option style={{ color: 'black' }}>Coursera</option>
//                   <option style={{ color: 'black' }}>YouTube</option>
//                   <option style={{ color: 'black' }}>Other</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Resource Type</label>
//                 <select>
//                   <option style={{ color: 'black' }}>Course</option>
//                   <option  style={{ color: 'black' }}>Video</option>
//                   <option style={{ color: 'black' }}>Article</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Resource Link</label>
//                 <input type="url" placeholder="https://example.com" />
//               </div>
//             </div>
//           </div>

//           {/* Section 2: Progress Tracking */}
//           <div className="form-section">
//             <h5 className="section-title">📈 Progress Tracking</h5>
//             <div className="form-grid">
//               <div className="form-group">
//                 <label>Status</label>
//                 <select>
//                   <option style={{ color: 'black' }}>Not Started</option>
//                   <option style={{ color: 'black' }}>In Progress</option>
//                   <option style={{ color: 'black' }}>Completed</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Hours Spent</label>
//                 <input type="number" min="0" placeholder="0" />
//               </div>
//               <div className="form-group">
//                 <label>Difficulty (1-5)</label>
//                 <input type="number" min="1" max="5" placeholder="1-Easy  5-Hard" />
//               </div>
//             </div>
//           </div>

//           {/* Section 3: Notes */}
//           <div className="form-section">
//             <h5 className="section-title">📝 Notes</h5>
//             <textarea rows="4" placeholder="Key insights, tips, or reminders..."></textarea>
//           </div>

//           {/* Submit */}
//           <div className="submit-btn-container">
//             <button type="submit"> Update Skill</button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditSkill;



import React, { useEffect, useState } from 'react';
import './AddCourse.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditSkill = () => {
  const { id } = useParams(); // This is the resource ID
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    platform: '',
    resource_type: '',
    resource_url: '',
    status: '',
    hours_spent: 0,
    difficulty: 1,
    notes: '',
    skill: '', // needed for update
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`http://127.0.0.1:8000/learning-resource/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    })
      .then(res => {
        setFormData(res.data);
      })
      .catch(err => {
        console.error("Failed to load resource data", err);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.put(`http://127.0.0.1:8000/update-learning-resource/${id}/`, formData, {
      headers: { Authorization: `Token ${token}` }
    })
      .then(res => {
        alert("Skill updated successfully!");
        navigate('/dashboard'); // or wherever you want to go
      })
      .catch(err => {
        console.error("Failed to update skill", err);
        alert("Update failed. See console for details.");
      });
  };

  return (
    <div className="add-skill-container">
      <div className="form-card">
        <h2 className="form-title">Edit Skill</h2>

        <form onSubmit={handleSubmit}>
          {/* Section 1: Skill Details */}
          <div className="form-section">
            <h5 className="section-title">🎯 Skill Information</h5>
            <div className="form-grid">
              <div className="form-group">
                <label>Skill Name</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Platform</label>
                <select name="platform" value={formData.platform} onChange={handleChange}>
                  <option value="" style={{ color: 'black' }}>Choose...</option>
                  <option value="Udemy" style={{ color: 'black' }}>Udemy</option>
                  <option value="Coursera" style={{ color: 'black' }}>Coursera</option>
                  <option value="YouTube" style={{ color: 'black' }}>YouTube</option>
                  <option value="Other" style={{ color: 'black' }}>Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Resource Type</label>
                <select name="resource_type" value={formData.resource_type} onChange={handleChange}>
                  <option value="Course" style={{ color: 'black' }}>Course</option>
                  <option value="Video" style={{ color: 'black' }}>Video</option>
                  <option value="Article" style={{ color: 'black' }}>Article</option>
                </select>
              </div>
              <div className="form-group">
                <label>Resource Link</label>
                <input type="url" name="resource_url" value={formData.resource_url} onChange={handleChange} />
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
                  <option value="Not Started" style={{ color: 'black' }}>Not Started</option>
                  <option value="In Progress" style={{ color: 'black' }}>In Progress</option>
                  <option value="Completed" style={{ color: 'black' }}>Completed</option>
                </select>
              </div>
              <div className="form-group">
                <label>Hours Spent</label>
                <input type="number" name="hours_spent" value={formData.hours_spent} onChange={handleChange} min="0" />
              </div>
              <div className="form-group">
                <label>Difficulty (1-5)</label>
                <input type="number" name="difficulty" value={formData.difficulty} onChange={handleChange} min="1" max="5" />
              </div>
            </div>
          </div>

          {/* Section 3: Notes */}
          <div className="form-section">
            <h5 className="section-title">📝 Notes</h5>
            <textarea name="notes" rows="4" value={formData.notes} onChange={handleChange}></textarea>
          </div>

          {/* Submit */}
          <div className="submit-btn-container">
            <button type="submit">Update Skill</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSkill;
