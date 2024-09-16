import React, { useState } from "react";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import axios from "axios";

const Customers = () => {
  const [formData, setFormData] = useState({
    CustName: "",
    CustContact: "",
    CustEmail: "",
    CustGender: "",
    CustBusiness: "",
    BusinessType: "No", // Default to "No"
    Region: "",
    SelectPlan: "",
    dateInput: "",
  });
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBusinessChange = (event) => {
    const value = event.target.value;
    setFormData({
      ...formData,
      CustBusiness: value,
      CustBusiness: value === "No" ? formData.BusinessType : "No", // Automatically set BusinessType to "No" if CustBusiness is "No"
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the formData for submission
    const submitData = {
      ...formData,
      BusinessType: formData.CustBusiness === "No" ? formData.BusinessType : "No" , // Ensure BusinessType is "No" when CustBusiness is "No"
    };

    console.log("Data being submitted: ", submitData); // Log the data to verify
    
    try {
      const response = await axios.post('http://localhost:8080/api/v1/add-cust', submitData);
      setSuccess("Customer added successfully!");
      setError("");

      // Reset the form fields after successful submission
      setFormData({
        CustName: "",
        CustContact: "",
        CustEmail: "",
        CustGender: "",
        CustBusiness: "",
        BusinessType: "No", // Reset to "No"
        Region: "",
        SelectPlan: "",
        dateInput: "",
      });
    } catch (err) {
      console.error("Error details:", err.response ? err.response.data : err.message);
      setError(err.response?.data?.message || "Failed to add customer. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="form-section">
      <h1 className="mb-5">
        Add Customer <a href="/viewcust" style={{ fontSize: "20px" }}>View Customers</a>
      </h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="CustName">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter customer name"
                name="CustName"
                value={formData.CustName}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="CustContact">
              <Form.Label>Customer Contact</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter customer contact"
                name="CustContact"
                value={formData.CustContact}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="CustEmail">
              <Form.Label>Customer Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter customer email"
                name="CustEmail"
                value={formData.CustEmail}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="CustGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="CustGender"
                value={formData.CustGender}
                onChange={handleChange}
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="CustBusiness">
              <Form.Label>Business</Form.Label>
              <Form.Control
                as="select"
                name="CustBusiness"
                value={formData.CustBusiness}
                onChange={handleBusinessChange}
                required
              >
                <option value="">Select Business</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Form.Control>
            </Form.Group>
          </Col>

          {/* Only show BusinessType if CustBusiness is "Yes" */}
          {formData.CustBusiness === "Yes" && (
            <Col md={4}>
              <Form.Group controlId="BusinessType">
                <Form.Label>Business Type</Form.Label>
                <Form.Control
                  as="select"
                  name="BusinessType"
                  value={formData.BusinessType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Business Type</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </Form.Control>
              </Form.Group>
            </Col>
          )}
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group controlId="Region">
              <Form.Label>Region</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter region"
                name="Region"
                value={formData.Region}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group controlId="SelectPlan">
              <Form.Label>Select Plan</Form.Label>
              <Form.Control
                as="select"
                name="SelectPlan"
                value={formData.SelectPlan}
                onChange={handleChange}
                required
              >
                <option value="">Select Plan</option>
                <option value="15MBPS">15 MBPS</option>
                <option value="30MBPS">30 MBPS</option>
                <option value="45MBPS">45 MBPS</option>
              </Form.Control>
              <Form.Text className="text-muted">Prediction plan</Form.Text>
            </Form.Group>
          </Col>

          {formData.SelectPlan && (
            <Col md={4}>
              <Form.Group controlId="dateInput">
                <Form.Label>Plan Expiry Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dateInput"
                  value={formData.dateInput}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          )}
        </Row>

        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default Customers;
