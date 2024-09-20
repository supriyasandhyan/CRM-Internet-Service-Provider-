import React, { useState } from "react";
import { Alert } from 'react-bootstrap';
import axios from 'axios';

const Employee = () => {
  const [formData, setFormData] = useState({
    EmpID: "",
    EmpName: "",
    EmpContact: "",
    EmpEmail: "",
    EmpLocation: "",
  });

  const [errors, setErrors] = useState({
    EmpID: "",
    EmpName: "",
    EmpContact: "",
    EmpEmail: "",
    EmpLocation: ""
  });

  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {
      EmpID: "",
      EmpName: "",
      EmpContact: "",
      EmpEmail: "",
      EmpLocation: ""
    };

    let isValid = true;

    if (!formData.EmpID) {
      newErrors.EmpID = "Valid Emp ID is required";
      isValid = false;
    }

    if (!formData.EmpName) {
      newErrors.EmpName = "Emp Name is required";
      isValid = false;
    }

    if (!formData.EmpContact || isNaN(formData.EmpContact) || formData.EmpContact <= 0) {
      newErrors.EmpContact = "Valid Emp Contact is required";
      isValid = false;
    }

    if (!formData.EmpEmail || !/\S+@\S+\.\S+/.test(formData.EmpEmail)) {
      newErrors.EmpEmail = "Valid Emp Email is required";
      isValid = false;
    }

    if (!formData.EmpLocation) {
      newErrors.EmpLocation = "Emp Location is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/v1/add-emp",
          formData
        );
        setSubmitStatus("Form submitted successfully!");
        console.log("data inside :" ,formData);
        
        setFormData({
          EmpID: "",
          EmpName: "",
          EmpContact: "",
          EmpEmail: "",
          EmpLocation: "",
        });
        setTimeout(() => {
          setSubmitStatus("");
        }, 2000);
      } catch (error) {
        setSubmitStatus("Failed to submit form. Please try again.");
      }
    } else {
      setSubmitStatus("");
    }
  };

  return (
    <>
      <h3>Add Employee</h3>
      {submitStatus && (
        <Alert variant={submitStatus.includes("successfully") ? "success" : "danger"}>
          {submitStatus}
        </Alert>
      )}
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
            onChange={handleChange}
          />
          {errors.EmpID && <div className="text-danger">{errors.EmpID}</div>}
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
          {errors.EmpName && <div className="text-danger">{errors.EmpName}</div>}
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
          {errors.EmpContact && <div className="text-danger">{errors.EmpContact}</div>}
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
          {errors.EmpEmail && <div className="text-danger">{errors.EmpEmail}</div>}
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
          {errors.EmpLocation && <div className="text-danger">{errors.EmpLocation}</div>}
        </div>

        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </>
  );
};

export default Employee;
