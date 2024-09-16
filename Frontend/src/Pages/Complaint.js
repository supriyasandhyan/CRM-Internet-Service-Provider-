import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Complaint = () => {
  const [emailSuggestions, setEmailSuggestions] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [selectedName, setSelectedName] = useState("");

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/get-cust");
        if (Array.isArray(response.data)) {
          setEmailSuggestions(response.data);
        }
      } catch (error) {
        console.error("Error fetching email suggestions:", error);
      }
    };

    fetchEmails();
  }, []);

  // Handle email selection
  const handleEmailChange = (e) => {
    const email = e.target.value;
    setSelectedEmail(email);

    // Find the corresponding customer based on the selected email
    const customer = emailSuggestions.find((cust) => cust.CustEmail === email);
    if (customer) {
      setSelectedName(customer.CustName); // Set the customer name based on email
    } else {
      setSelectedName(""); // Clear the name field if no match is found
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      CustEmail: selectedEmail,
      CustName: selectedName,
      complaint: e.target.formComplaint.value,
      date: e.target.formDate.value,
    };

    try {
      await axios.post("http://localhost:8080/api/v1/submit-complaint", formData);
      alert("Complaint submitted successfully!");

      // Clear form fields
      setSelectedEmail("");
      setSelectedName("");
      e.target.formComplaint.value = "";
      e.target.formDate.value = "";
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit complaint");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Complaints</h1>
      {/* Email Selection */}
      <Form.Group controlId="formEmail">
        <Form.Label>Customer Email</Form.Label>
        <Form.Control
          as="select"
          value={selectedEmail}
          onChange={handleEmailChange}
        >
          <option value="">Select an email</option>
          {emailSuggestions.length > 0 ? (
            emailSuggestions.map((cust) => (
              <option key={cust.CustEmail} value={cust.CustEmail}>
                {cust.CustEmail}
              </option>
            ))
          ) : (
            <option disabled>No emails available</option>
          )}
        </Form.Control>
      </Form.Group>

      {/* Name Field */}
      <Form.Group controlId="formName">
        <Form.Label>Customer Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Customer name"
          value={selectedName}
          readOnly // The field is read-only since it is auto-filled
        />
      </Form.Group>

      {/* Complaint Field */}
      <Form.Group controlId="formComplaint">
        <Form.Label>Complaint</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Enter complaint details" />
      </Form.Group>

      {/* Date Field */}
      <Form.Group controlId="formDate">
        <Form.Label>Date</Form.Label>
        <Form.Control type="date" />
      </Form.Group>

      {/* Submit Button */}
      <Button variant="primary" type="submit" className="mt-4 px-4">
        Submit
      </Button>
    </Form>
  );
};

export default Complaint;
