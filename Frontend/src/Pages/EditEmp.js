import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditEmp = () => {
  const { EmpID } = useParams(); // Get EmpID from the route
  const navigate = useNavigate(); // For navigation after update
  
  const [formData, setFormData] = useState({
    EmpID: '',
    EmpName: '',
    EmpEmail: '',
    EmpContact: '',
    EmpLocation: '',
  });

  // Fetch the existing data using useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/get-emp/${EmpID}`);
        setFormData(response.data); // Assuming the response contains employee data
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    if (EmpID) {
      fetchData();
    }
  }, [EmpID]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8080/api/v1/edit-emp/${EmpID}`, formData);
      console.log("Data updated successfully", response.data);
      // Redirect to the employee list page after update
      navigate('/viewemp');
    } catch (error) {
      console.log("Error updating data", error);
    }
  };

  return (
    <>
      <h3>Edit Employee &nbsp; <a href="/viewemp">View Employees</a></h3>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="empid" className="form-label">
            Employee ID
          </label>
          <input
            type="text"
            className="form-control"
            id="empid"
            name="EmpID"
            value={formData.EmpID}
            readOnly
          />
        </div>

        <div className="mb-3">
          <label htmlFor="empname" className="form-label">
            Employee Name
          </label>
          <input
            type="text"
            name="EmpName"
            className="form-control"
            id="empname"
            value={formData.EmpName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="empcontact" className="form-label">
            Employee Contact
          </label>
          <input
            type="tel"
            name="EmpContact"
            className="form-control"
            id="empcontact"
            value={formData.EmpContact}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="empemail" className="form-label">
            Employee Email
          </label>
          <input
            type="email"
            className="form-control"
            id="empemail"
            name="EmpEmail"
            value={formData.EmpEmail}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="emplocation" className="form-label">
            Employee Location
          </label>
          <input
            type="text"
            name="EmpLocation"
            className="form-control"
            id="emplocation"
            value={formData.EmpLocation}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </>
  );
};

export default EditEmp;
