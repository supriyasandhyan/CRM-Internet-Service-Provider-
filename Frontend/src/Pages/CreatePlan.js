import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const CreatePlan = () => {
  const [formData, setFormData] = useState({
    planName: '',
    speedLimits: '',
    cost: '',
    duration: ''
  });

  const [errors, setErrors] = useState({
    planName: '',
    speedLimits: '',
    cost: '',
    duration: ''
  });

  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/plans');
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {
      planName: '',
      speedLimits: '',
      cost: '',
      duration: ''
    };

    let isValid = true;

    if (!formData.planName) {
      newErrors.planName = 'Plan Name is required';
      isValid = false;
    }

    if (!formData.speedLimits || isNaN(formData.speedLimits) || formData.speedLimits <= 0) {
      newErrors.speedLimits = 'Valid Speed Limits are required';
      isValid = false;
    }

    if (!formData.cost || isNaN(formData.cost) || formData.cost <= 0) {
      newErrors.cost = 'Valid Cost is required';
      isValid = false;
    }

    if (!formData.duration || isNaN(formData.duration) || formData.duration <= 0) {
      newErrors.duration = 'Valid Duration in days is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8080/api/v1/create-plan', formData);
          setSubmitStatus('Form submitted successfully!');
        setFormData({
          planName: '',
          speedLimits: '',
          cost: '',
          duration: ''
        });
        setTimeout(() => {
          setSubmitStatus('');
        }, 2000);
      } catch (error) {
        setSubmitStatus('Failed to submit form. Please try again.');
      }
    } else {
      setSubmitStatus('');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Plan</h2>
      {submitStatus && <Alert variant={submitStatus.includes('successfully') ? 'success' : 'danger'}>{submitStatus}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formPlanName">
          <Form.Label>Enter Plan Name</Form.Label>
          <Form.Control
            as="select"
            name="planName"
            value={formData.planName}
            onChange={handleChange}
            isInvalid={!!errors.planName}
          >
            <option value="">Select Plan</option>
            <option value="Fast Speed Plan">Fast Speed Plan</option>
            <option value="Average Speed Plan">Average Speed Plan</option>
            <option value="Low Speed Plan">Low Speed Plan</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">{errors.planName}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formSpeedLimits">
          <Form.Label>Enter Speed Limits</Form.Label>
          <Form.Control
            type="number"
            name="speedLimits"
            value={formData.speedLimits}
            onChange={handleChange}
            isInvalid={!!errors.speedLimits}
            placeholder="Enter Speed Limits"
          />
          <Form.Control.Feedback type="invalid">{errors.speedLimits}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formCost">
          <Form.Label>Enter Cost</Form.Label>
          <Form.Control
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            isInvalid={!!errors.cost}
            placeholder="Enter Cost"
          />
          <Form.Control.Feedback type="invalid">{errors.cost}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formDuration">
          <Form.Label>Enter Duration in Days</Form.Label>
          <Form.Control
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            isInvalid={!!errors.duration}
            placeholder="Enter Duration in Days"
          />
          <Form.Control.Feedback type="invalid">{errors.duration}</Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreatePlan;
