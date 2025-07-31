import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';


const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: '', description: '' });
  const [totalHours, setTotalHours] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [totalCourses, setTotalCourses] = useState(0);


  const navigate = useNavigate();

  // Open and close modal
  const handleOpen = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setNewSkill({ name: '', description: '' });
  };

  const handleViewSkill = (skillId) => {
  navigate(`/courselist/${skillId}`);
};


  // Add new skill
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.name.trim()) return;

    const body = {
      name: newSkill.name,
      description: newSkill.description,
    };

    const token = localStorage.getItem('token');
    console.log('Adding skill, token:', token);

    axios
      .post('http://127.0.0.1:8000/createskill/', body, {
        headers: {
          Authorization: 'Token ' + token,
        },
      })
      .then((response) => {
        console.log('Skill added');
        setSkills((prev) => [...prev, response.data]);
        handleClose();
      })
      .catch((error) => {
        console.error('Error adding skill:', error);
      });
  };

  // Fetch skills from backend
  const fetchSkills = () => {
    const token = localStorage.getItem('token');
    console.log('Fetching skills, token:', token);

    axios
      .get('http://127.0.0.1:8000/listskills/', {
        headers: {
          Authorization: 'Token ' + token,
        },
      })
      .then((response) => {
        setSkills(response.data);
      })
      .catch((error) => {
        console.error('Error fetching skills:', error);
      });
  };

  //Fetch total hours from backend

  const fetchTotalHours = () => {
  const token = localStorage.getItem('token');
  axios
    .get('http://127.0.0.1:8000/total-hours/', {
      headers: {
        Authorization: 'Token ' + token,
      },
    })
    .then((response) => {
      setTotalHours(response.data.total_hours);
    })
    .catch((error) => {
      console.error('Error fetching total hours:', error);
    });
};

//total courses in dashboard
useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://127.0.0.1:8000/total-courses/', {
      headers: {
        Authorization: `Token ${token}`
      }
    }).then(res => {
      setTotalCourses(res.data.total_courses);
    }).catch(err => {
      console.error("Failed to fetch total courses:", err);
    });
  }, []);

// total completed course in dashboard

useEffect(() => {
  const token = localStorage.getItem('token');
  axios.get('http://127.0.0.1:8000/completed-resources/', {
    headers: {
      Authorization: `Token ${token}`
    }
  })
  .then(res => {
    setCompletedCount(res.data.completed);
  })
  .catch(err => {
    console.error("Error fetching completed count:", err);
  });
}, []);


// Learning categories in dashboard

const fetchLearningCategories = () => {
  const token = localStorage.getItem('token');
  axios
    .get('http://127.0.0.1:8000/learning-categories/', {
      headers: { Authorization: 'Token ' + token },
    })
    .then((response) => {
      setCategories(response.data);
    })
    .catch((error) => {
      console.error('Error fetching learning categories:', error);
    });
};

  // Load skills on mount
  useEffect(() => {
    fetchSkills();
    fetchTotalHours();
    
    fetchLearningCategories();
  }, []);

  return (
    <div className="dashboard-container text-white">
      <Navbar />

      <div className="container py-5">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2 className="fw-bold">🚀 Skill Stack</h2>
          <button className="btn btn-glass text-white fw-semibold" onClick={handleOpen}>
            + Add New Skill
          </button>
        </div>

        {/* Summary Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="glass-card p-4">
              <h6 className="text-muted">Total Courses</h6>
              <h3 className="fw-bold">{totalCourses}</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="glass-card p-4">
              <h6 className="text-muted">Hours Spent</h6>
              <h3 className="fw-bold">{totalHours} hrs</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="glass-card p-4">
              <h6 className="text-muted">Completed</h6>
              <h3 className="fw-bold">{completedCount}</h3>
            </div>
          </div>
        </div>

        {/* Skills List */}
        {skills.length > 0 && (
          <>
            <h4 className="mb-3">🧠 Your Skills</h4>
<div className="row g-4 mb-5">
  {skills.map((skill, index) => (
    <div key={index} className="col-md-4 mb-4">
      <div className="glass-card p-3 d-flex flex-column justify-content-between h-100">
        <div>
          <h5 className="fw-bold mb-2">{skill.name}</h5>
          <p className="text-light small">{skill.description}</p>
        </div>
        <div className="text-end">
          <button
            className="btn btn-outline-info btn-sm mt-3"
            onClick={() => handleViewSkill(skill.id)}
          >
            View
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

          </>
        )}

        {/* Learning Categories */}
        <h4 className="mb-3">🎓 Learning Categories</h4>
        <div className="row g-3 mb-5">
          {categories.map((category, index) => (
            <div className="col-sm-4" key={index}>
              <div className="category-glass">
                <span className={`badge ${
                  category.resource_type === 'Course' ? 'bg-primary' :
                  category.resource_type === 'Video' ? 'bg-warning' :
                  category.resource_type === 'Article' ? 'bg-success' :
                  'bg-secondary'
                }`}>
                  {category.resource_type}
                </span>
                <p className="mb-1 mt-2 small text-light">
                  {category.resource_type === 'Course' && 'Udemy, Coursera'}
                  {category.resource_type === 'Video' && 'YouTube'}
                  {category.resource_type === 'Article' && 'Blogs, Medium'}
                </p>
                <strong>{category.count} Resources</strong>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Modal for Adding Skill */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Add New Skill</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Skill Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter skill name"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Brief Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={newSkill.description}
                onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="bg-dark">
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="info" onClick={handleAddSkill}>
            Add Skill
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
