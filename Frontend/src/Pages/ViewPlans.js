import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

const ViewPlans = () => {
  const [plans, setPlans] = useState([]);

  // Fetch plans from the backend
  const fetchPlans = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/getallplans");
      setPlans(response.data);
    } catch (error) {
      console.error("Failed to fetch plans", error);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <div className="container">
      <h3>Plans</h3>

      {/* Plans Table */}
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Plan Name</th>
            <th>Speed Limits (Mbps)</th>
            <th>Cost ($)</th>
            <th>Duration (Days)</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan._id}>
              <td>{plan.planName}</td>
              <td>{plan.speedLimits}</td>
              <td>{plan.cost}</td>
              <td>{plan.duration}</td>
            </tr>
          ))}
        </tbody>
      </Table>

    </div>
  );
};

export default ViewPlans;
