import React from 'react';
import './Courselist.css';
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Courselist = () => {
  const [resources, setResources] = useState([]);
  const [skillName, setSkillName] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();
   
  const handleAddCourse = () => {
    navigate(`/courselist/${id}/add`);
  };

  const handleCardClick = (resourceId) => {
    navigate(`/skilldetails/${resourceId}`);
  };

  //get cards courselist page

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`http://127.0.0.1:8000/get-titles-and-notes/${id}/`, {
        headers: { Authorization: "Token " + token },
      })
      .then((response) => {
        setResources(response.data);
      })
      .catch((error) => {
        console.error("Error fetching course resources:", error);
      });
  }, [id]);


  // get skill name in course list page

  useEffect(() => {
  const token = localStorage.getItem("token");
  axios.get(`http://127.0.0.1:8000/get-skill-name/${id}/`, {
    headers: { Authorization: "Token " + token },
  })
  .then((res) => {
    setSkillName(res.data.name);
  })
  .catch((err) => {
    console.error("Error fetching skill name:", err);
  });
}, [id]);

  return (
    <div className="skill-details-container">
      <div className="header-section d-flex justify-between">
        <div>
          <h1 className="skill-title">🚀 {skillName}</h1>
          <p className="skill-subtitle">Explore each topic in detail to enhance your full stack journey.</p>
        </div>
        <button className="add-btn" onClick={handleAddCourse}>+ Add New Course</button>
      </div>

      <div className="topics-grid">
        {resources.map((resource, index) => (
          <div
            className="topic-card"
            key={index}
            onClick={() => handleCardClick(resource.id)} // Make it clickable
            style={{ cursor: "pointer" }}
          >
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

export default Courselist;
