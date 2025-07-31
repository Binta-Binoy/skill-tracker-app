// import React from 'react';
// import './SkillDetails.css'; 
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const SkillDetails = () => {
//   const { id } = useParams();  // resource ID from the URL
//   const [resource, setResource] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     axios.get(`http://127.0.0.1:8000/resourcedetails/${id}/`, {
//       headers: { Authorization: `Token ${token}` }
//     })
//     .then(response => {
//       setResource(response.data);
//     })
//     .catch(error => {
//       console.error("Error fetching resource details:", error);
//     });
//   }, [id]);

//   if (!resource) {
//     return <p className="text-center text-light">Loading...</p>;
//   }
//   return (
//     <div className="min-vh-100 bg-dark text-light d-flex justify-content-center align-items-start py-5">
//       <div className="container px-3">
//         <div className="card bg-secondary text-light border-0 shadow-lg rounded-4 p-4">

//           <h2 className="text-center fw-bold mb-4 text-warning">📘 Skill Details</h2>

//           {/* Skill Info */}
//           <div className="mb-4">
//             <h3 className="fw-bold text-warning">ReactJS</h3>
//             <p className="mb-1"><strong>Platform:</strong> Udemy</p>
//             <p className="mb-1"><strong>Resource Type:</strong> Course</p>
//             <p className="mb-2">
//               <strong>Link:</strong>{' '}
//               <a href="https://udemy.com/react-course" target="_blank" rel="noreferrer" className="text-info text-decoration-underline">
//                 View Course
//               </a>
//             </p>
//           </div>

//           {/* Progress Cards */}
//           <div className="row g-3 mb-4">
//             <div className="col-md-4">
//               <div className="card bg-dark text-light border border-warning rounded-3 p-3 text-center h-100">
//                 <h6 className="text-muted text-uppercase">Status</h6>
//                 <span className="badge bg-info text-dark mt-2">In Progress</span>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="card bg-dark text-light border border-warning rounded-3 p-3 text-center h-100">
//                 <h6 className="text-muted text-uppercase">Hours Spent</h6>
//                 <p className="fs-5 fw-bold mt-2">8 hrs</p>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="card bg-dark text-light border border-warning rounded-3 p-3 text-center h-100">
//                 <h6 className="text-muted text-uppercase">Difficulty</h6>
//                 <p className="fs-5 fw-bold mt-2">4 / 5 ⭐</p>
//               </div>
//             </div>
//           </div>

//           {/* Notes */}
//           <div className="card bg-dark text-light border border-warning rounded-3 p-3 mb-4">
//             <h5 className="text-warning mb-2">📝 Notes</h5>
//             <p className="mb-0">
//               Covered basics of React. Working on advanced hooks and performance optimization. Will revisit Redux next.
//             </p>
//           </div>

//           {/* Edit Button */}
//           <div className="text-end">
//             <button className="btn btn-outline-warning">✏️ Edit Skill</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SkillDetails;



import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SkillDetails = () => {
  const { id } = useParams();  // This is the resource ID
  const [resource, setResource] = useState(null);

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate(`/edit/${id}`); // `id` is the resource ID from useParams()
  };


  useEffect(() => {
    const fetchResource = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://127.0.0.1:8000/resource-details/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setResource(res.data);
      } catch (error) {
        console.error('Error fetching resource details:', error);
      }
    };

    fetchResource();
  }, [id]);

  if (!resource) {
    return <div className="text-light text-center">Loading...</div>;
  }

  return (
    <div className="min-vh-100 bg-dark text-light d-flex justify-content-center align-items-start py-5">
      <div className="container px-3">
        <div className="card bg-secondary text-light border-0 shadow-lg rounded-4 p-4">
          <h2 className="text-center fw-bold mb-4 text-warning">📘 Resource Details</h2>

          <div className="mb-4">
            <h3 className="fw-bold text-warning">{resource.title}</h3>
            <p className="mb-1"><strong>Platform:</strong> {resource.platform}</p>
            <p className="mb-1"><strong>Resource Type:</strong> {resource.resource_type}</p>
            <p className="mb-2">
              <strong>Link:</strong>{' '}
              <a href={resource.url} target="_blank" rel="noreferrer" className="text-info text-decoration-underline">
                View Resource
              </a>
            </p>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="card bg-dark text-light border border-warning rounded-3 p-3 text-center h-100">
                <h6 className="text-muted text-uppercase">Status</h6>
                <span className="badge bg-info text-dark mt-2">{resource.status}</span>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-dark text-light border border-warning rounded-3 p-3 text-center h-100">
                <h6 className="text-muted text-uppercase">Hours Spent</h6>
                <p className="fs-5 fw-bold mt-2">{resource.hours_spent} hrs</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-dark text-light border border-warning rounded-3 p-3 text-center h-100">
                <h6 className="text-muted text-uppercase">Difficulty</h6>
                <p className="fs-5 fw-bold mt-2">{resource.difficulty} / 5 ⭐</p>
              </div>
            </div>
          </div>

          <div className="card bg-dark text-light border border-warning rounded-3 p-3 mb-4">
            <h5 className="text-warning mb-2">📝 Notes</h5>
            <p className="mb-0">{resource.notes}</p>
          </div>

          <div className="text-end">
            <button className="btn btn-outline-warning"  onClick={handleEditClick}>✏️ Edit Resource</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillDetails;

