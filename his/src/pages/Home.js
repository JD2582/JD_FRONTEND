import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Table.css';
import './Ward.css'; 
import Swal from 'sweetalert2';

export default function Home() {
  const [wardData, setWardData] = useState([]);
  const [formData, setFormData] = useState({ wardNo: '', patientId: '', action: 'A' });
  const [fetchingData, setFetchingData] = useState(false); // State to track whether data is being fetched
  const [showForm, setShowForm] = useState(false); // State to manage form visibility
  const nurseId = "nur1";

  const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJucEBnbWFpbC5jb20iLCJyb2xlIjpbIk5VUlNFIl0sImlhdCI6MTcxMzAxOTU2NSwiZXhwIjoxNzEzMTA1OTY1fQ.bz1uM-itYCqsWVKRRGcn84i7J3hRj8UpJJt1c80FTM0";

  const fetchWardDetails = async () => {
    try {
      setFetchingData(true); // Set fetchingData to true when fetching starts
      const response = await axios.get('https://summary-gnu-equally.ngrok-free.app/his/nurse/getWard?id='+nurseId, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Authorization': token,
        }
      });
      const responseData = response.data.response;
      console.log('Response data:', responseData);
      setWardData(responseData);
    } catch (error) {
      console.error('Error fetching ward details:', error);
    } finally {
      setFetchingData(false); // Set fetchingData to false when fetching ends
    }
  };

  const handleAssignPatient = (wardNo) => {
    setFormData({ ...formData, wardNo });
    setShowForm(true); // Show the form when assigning patient
  };
  
  const handleAssignPatientSubmit = () => {
    const { patientId, action, wardNo } = formData;
    // Call API to assign patient
    const requestBody = {
      id: patientId,
      wardNo,
      action
    };


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You want to assign the patient : "+patientId+" to the ward : "+wardNo+"!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Assign!",
      cancelBut4tonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        console.log('Form data submitted:', requestBody);
        axios.post(`https://summary-gnu-equally.ngrok-free.app/his/nurse/updateWard/${nurseId}`, requestBody, {
          headers: {
            'ngrok-skip-browser-warning': 'true',
            'Authorization': token,
          }
        })
          .then(response => {
            console.log('Patient assigned successfully:', response.data);
            setShowForm(false); // Hide the form after submission
            fetchWardDetails();
          })
          .catch(error => {
            console.error('Error assigning patient:', error);
          });

        swalWithBootstrapButtons.fire({
          title: "Assigned!",
          text: "Patient is admited successfully.",
          icon: "success"
        });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Patient is not assigned :)",
          icon: "error"
        });
      }
    });
    
  };


  const handleDischarge = (wardNo, patientId) => {
    const action = 'D';
    const requestBody = {
      id: patientId,
      wardNo,
      action
    };

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You want to discharge the patient : "+patientId+" from the ward : "+wardNo,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Discharge it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        console.log('Discharge request:', requestBody);
        axios.post(`https://summary-gnu-equally.ngrok-free.app/his/nurse/updateWard/${nurseId}`, requestBody, {
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Authorization': token,
      }
    })
      .then(response => {
        console.log('Patient discharged successfully:', response.data);
        // Refresh the ward details after discharge
        fetchWardDetails();
      })
      .catch(error => {
        console.error('Error discharging patient:', error);
      });
        swalWithBootstrapButtons.fire({
          title: "Discharged!",
          text: "Patient removed from ward.",
          icon: "success"
        });
      } else if (
        //Read more about handling dismissals below
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Patient is not discharged :)",
          icon: "error"
        });
      }
    });

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div className="container mt-4">
      <h2>Available Wards</h2>
    
      <button onClick={fetchWardDetails} className="btn btn-primary mb-3" disabled={fetchingData}>
        {fetchingData ? 'Fetching Patient...' : 'Fetch Patient'}
      </button>
      <Link to="/prescription" className="btn btn-success mb-3">Go to Prescription</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Ward Number</th>
            <th>Ward Type</th>
            <th>Patient ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Assign Patient</th>
            <th>Discharge</th>
          </tr>
        </thead>
        <tbody>
          {wardData.map(ward => (
            <tr key={ward.wardNo}>
              <td>{ward.wardNo}</td>
              <td>{ward.type}</td>
              <td>{ward.patientId}</td>
              <td>{ward.firstName}</td>
              <td>{ward.lastName}</td>
              <td>
                {ward.empty && (
                  <button onClick={() => handleAssignPatient(ward.wardNo)} className="btn btn-primary">Assign Patient</button>
                )}
              </td>
              <td>
                {!ward.empty && (
                  <button onClick={() => handleDischarge(ward.wardNo, ward.patientId)} className="btn btn-danger">Discharge</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <div className="form-container">
          <div className="form-group">
            <input type="text" name="patientId" value={formData.patientId} onChange={handleInputChange} placeholder="Enter Patient ID" className="form-control mr-2" />
            <select name="action" value={formData.action} onChange={handleInputChange} className="form-control mr-2">
              <option value="A">Admit</option>
              <option value="D">Discharge</option>
            </select>
            <button onClick={handleAssignPatientSubmit} className="btn btn-success">Submit</button>
          </div>
        </div>
      )}
    </div>
  );
}


