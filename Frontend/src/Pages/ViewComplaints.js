import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

const ComplaintsTable = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/getAllComplaint');
        console.log(response.data);  // Log the data structure to inspect `CustEmail`
        setComplaints(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching complaints');
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
    <h3>Pending Complaints</h3>
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Email</th>
          <th>Name</th>
          <th>Complaint</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {complaints.length > 0 ? (
          complaints.map((complaint, index) => (
            <tr key={index}>
              <td>{complaint.CustEmail && complaint.CustEmail.CustEmail ? complaint.CustEmail.CustEmail : 'N/A'}</td>
              <td>{complaint.CustName || 'N/A'}</td>
              <td>{complaint.complaint || 'N/A'}</td>
              <td>{new Date(complaint.date).toLocaleDateString()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">No complaints found</td>
          </tr>
        )}
      </tbody>
    </Table>
    </>
  );
};

export default ComplaintsTable;
