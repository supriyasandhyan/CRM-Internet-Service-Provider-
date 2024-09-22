import React, { useEffect, useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const ComplaintsTable = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [statuses, setStatuses] = useState({}); // State to store statuses (Resolved/Unresolved)
  const [selectedEmployees, setSelectedEmployees] = useState({}); // To track selected employee per complaint

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/getAllComplaint');
        setComplaints(response.data);

        const initialStatuses = response.data.reduce((acc, complaint, index) => {
          acc[index] = 'Unresolved';
          return acc;
        }, {});
        setStatuses(initialStatuses);

        setLoading(false);
      } catch (err) {
        setError('Error fetching complaints');
        setLoading(false);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/get-emp');
        setEmployees(response.data);
      } catch (err) {
        console.error('Error fetching employees:', err);
      }
    };

    fetchComplaints();
    fetchEmployees();
  }, []);

  const handleEmployeeSelect = (index, empEmail) => {
    const newSelectedEmployees = { ...selectedEmployees, [index]: empEmail };
    setSelectedEmployees(newSelectedEmployees);
  };

  const handleStatusToggle = (index) => {
    const selectedEmp = selectedEmployees[index];
    
    if (!selectedEmp) {
      alert("Please select an employee");
    } else {
      const newStatuses = { ...statuses, [index]: statuses[index] === 'Unresolved' ? 'Resolved' : 'Unresolved' };
      setStatuses(newStatuses);
      if (newStatuses[index] === 'Resolved') {
        alert(`Complaint has been resolved by ${selectedEmp}`);
      }
    }
  };

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
            <th>Employee</th>
            <th>Action</th>
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
                <td>
                  <Form.Control
                    as="select"
                    value={selectedEmployees[index] || ""}
                    onChange={(e) => handleEmployeeSelect(index, e.target.value)}
                  >
                    <option value="" disabled>Select an employee</option>
                    {employees.length > 0 ? (
                      employees.map((emp) => (
                        <option key={emp.EmpEmail} value={emp.EmpEmail}>
                          {emp.EmpEmail}
                        </option>
                      ))
                    ) : (
                      <option disabled>No employees available</option>
                    )}
                  </Form.Control>
                </td>
                <td>
                  <Button
                    variant={statuses[index] === 'Unresolved' ? 'danger' : 'success'}
                    onClick={() => handleStatusToggle(index)}
                  >
                    {statuses[index]}
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No complaints found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default ComplaintsTable;
