import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: '', description: '' });

  // Open and close modal
  const handleOpen = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setNewSkill({ name: '', description: '' });
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

  // Load skills on mount
  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className="dashboard-container text-white">
      <div className="container py-5">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2 className="fw-bold">🚀 Skill Tracker</h2>
          <button className="btn btn-glass text-white fw-semibold" onClick={handleOpen}>
            + Add New Skill
          </button>
        </div>

        {/* Summary Cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <div className="glass-card p-4">
              <h6 className="text-muted">Total Skills</h6>
              <h3 className="fw-bold">{skills.length}</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="glass-card p-4">
              <h6 className="text-muted">Hours Spent</h6>
              <h3 className="fw-bold">36 hrs</h3>
            </div>
          </div>
          <div className="col-md-4">
            <div className="glass-card p-4">
              <h6 className="text-muted">Completed</h6>
              <h3 className="fw-bold">7</h3>
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
                  <div className="glass-card p-3">
                    <h5 className="fw-bold mb-2">{skill.name}</h5>
                    <p className="text-light small">{skill.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Learning Categories */}
        <h4 className="mb-3">🎓 Learning Categories</h4>
        <div className="row g-3 mb-5">
          <div className="col-sm-4">
            <div className="category-glass">
              <span className="badge bg-primary">Course</span>
              <p className="mb-1 mt-2 small text-light">Udemy, Coursera</p>
              <strong>5 Skills</strong>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="category-glass">
              <span className="badge bg-warning">Video</span>
              <p className="mb-1 mt-2 small text-light">YouTube</p>
              <strong>4 Skills</strong>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="category-glass">
              <span className="badge bg-success">Article</span>
              <p className="mb-1 mt-2 small text-light">Blogs, Medium</p>
              <strong>3 Skills</strong>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <h4 className="mb-3">🕓 Recent Activity</h4>
        <div className="glass-card p-4">
          <ul className="list-unstyled mb-0">
            <li>✅ Completed “Intro to Git & GitHub”</li>
            <li>📖 Started “React Advanced Patterns”</li>
            <li>📝 Added notes to “Python Basics”</li>
          </ul>
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
