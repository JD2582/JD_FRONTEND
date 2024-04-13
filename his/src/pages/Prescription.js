import React, { useState } from 'react';
import axios from 'axios';

export default function Prescription() {
  const [diagnosisId, setDiagnosisId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [prescriptionData, setPrescriptionData] = useState([]);
  const pharmaId = 'darshit-pharma';

  const token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYXJzaGl0Lmpha2hhbml5YUBpaWl0Yi5hYy5pbiIsInJvbGUiOlsiUEhBUk1BQ0lTVCJdLCJpYXQiOjE3MTMwMzg2NzgsImV4cCI6MTcxMzEyNTA3OH0.rzjmOTVM5rK5ScnbSoESqjguhvspO_U41xX7XuJEybE";

  const handleSearchByDiagnosisId = () => {
    axios.get(`http://localhost:8090/his/pharma/viewByDiagnosis?pharmaId=${pharmaId}&diagnosisId=${diagnosisId}`, {
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Authorization': token,
        }
      })
      .then(response => {
        console.log('Search by diagnosisId response:', response.data);
        setPrescriptionData(response.data.response);
      })
      .catch(error => {
        console.error('Error searching by diagnosisId:', error);
      });
  };

  const handleSearchByDate = () => {
    // Format dates according to API format: yyyy-MM-dd
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    axios.get(`http://localhost:8090/his/pharma/viewHistory?startDate=${formattedStartDate}&endDate=${formattedEndDate}&pharmaId=${pharmaId}`,{
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Authorization': token,
        }
      })
      .then(response => {
        console.log('Search by date response:', response.data);
        setPrescriptionData(response.data.response);
      })
      .catch(error => {
        console.error('Error searching by date:', error);
      });
  };

  // Helper function to format date to yyyy-mm-dd
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  return (
    <div className="container mt-4">
      <h2>Search Prescription</h2>
      <div className="row mb-3">
        <div className="col-md-6">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Enter Diagnosis ID" value={diagnosisId} onChange={e => setDiagnosisId(e.target.value)} />
            <button className="btn btn-primary" onClick={handleSearchByDiagnosisId}>Search</button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-group">
            <input type="date" className="form-control" value={startDate} onChange={e => setStartDate(e.target.value)} />
            <input type="date" className="form-control" value={endDate} onChange={e => setEndDate(e.target.value)} />
            <button className="btn btn-primary" onClick={handleSearchByDate}>Search</button>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Diagnosis ID</th>
              <th>Date and Time</th>
            </tr>
          </thead>
          <tbody>
            {prescriptionData.map((prescription, index) => (
              <tr key={index}>
                <td>{prescription.name}</td>
                <td>{prescription.diagnosisId}</td>
                <td>{prescription.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
