import React from 'react';
import './SkillList.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import  { useEffect, useState } from 'react';

// const topics = [
//   { name: 'HTML', description: 'Structure of web pages, forms, and semantic tags' },
//   { name: 'CSS', description: 'Flexbox, Grid, media queries, transitions' },
//   { name: 'JavaScript', description: 'ES6+, DOM, asynchronous programming' },
//   { name: 'React.js', description: 'Components, hooks, state management' },
//   { name: 'Bootstrap', description: 'Responsive design, utility classes' },
//   { name: 'Django', description: 'Python backend framework, ORM, views' },
//   { name: 'REST API', description: 'API architecture, CRUD operations' },
//   { name: 'PostgreSQL', description: 'Relational database, queries, indexing' },
//   { name: 'Git & GitHub', description: 'Version control, branches, pull requests' },
// ];

const SkillDetails = () => {
  const [resources, setResources] = useState([]);
  var navigate = useNavigate();
  const handleAddCourse = () => {
    navigate('/add');
  };

useEffect(() => {
  const token = localStorage.getItem("token");
  axios.get("http://127.0.0.1:8000/get-titles-notes/", {
    headers: {
      Authorization: "Token " + token
    }
  })
  .then(response => setResources(response.data))
  .catch(error => console.error("Error loading data:", error));
}, []);
 

  return (
    <div className="skill-details-container">
      <div className="header-section d-flex justify-between">
        <div>
          <h1 className="skill-title">🚀 Python Full Stack Development</h1>
          <p className="skill-subtitle">Explore each topic in detail to enhance your full stack journey.</p>
        </div>
        <button className="add-btn" onClick={handleAddCourse}>+ Add New Course</button>
      </div>

      <div className="topics-grid">
        {resources.map((resource, index) => (
          <div className="topic-card" key={index}>
            <div className="card-content">
              <h4>{resource.title}</h4>
              <p>{resource.notes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillDetails;
