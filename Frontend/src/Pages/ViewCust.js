import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Form, Alert } from "react-bootstrap";
import { MdDelete, MdEdit } from "react-icons/md";

const ViewCust = () => {
  const [customers, setCustomers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [customerData, setCustomerData] = useState({
    CustName: "",
    CustContact: "",
    CustEmail: "",
    CustGender: "",
    CustBusiness: "",
    BusinessType: "",
    Region: "",
    SelectPlan: "",
    dateInput: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/get-cust");
      setCustomers(response.data);
    } catch (err) {
      console.error("Failed to fetch customers:", err);
      setError("Failed to fetch customers.");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/delete-cust/${id}`);
      setCustomers(customers.filter((customer) => customer._id !== id));
      setSuccess("Customer deleted successfully!");
      setError("");
    } catch (err) {
      console.error("Failed to delete customer:", err);
      setError("Failed to delete customer.");
    }
  };

  const handleEdit = (customer) => {
    setCurrentCustomer(customer);
    setCustomerData({
      CustName: customer.CustName,
      CustContact: customer.CustContact,
      CustEmail: customer.CustEmail,
      CustGender: customer.CustGender,
      CustBusiness: customer.CustBusiness,
      BusinessType: customer.BusinessType,
      Region: customer.Region,
      SelectPlan: customer.SelectPlan,
      dateInput: customer.dateInput,
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  const handleSubmitEdit = async () => {
    try {
      await axios.put(`http://localhost:8080/api/v1/edit-cust/${currentCustomer._id}`, customerData);
      setCustomers(customers.map(cust =>
        cust._id === currentCustomer._id ? { ...cust, ...customerData } : cust
      ));
      setShowEditModal(false);
      setSuccess("Customer updated successfully!");
      setError("");
    } catch (err) {
      console.error("Failed to update customer:", err);
      setError("Failed to update customer.");
    }
  };

  return (
    <div>
      <h3>View Customers</h3>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <div className="container mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Cust Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Business</th>
              <th>Business Type</th>
              <th>Region</th>
              <th>Selected Plan</th>
              <th>Plan Expiry</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td>{customer.CustName}</td>
                <td>{customer.CustContact}</td>
                <td>{customer.CustEmail}</td>
                <td>{customer.CustGender}</td>
                <td>{customer.CustBusiness}</td>
                <td>{customer.BusinessType}</td>
                <td>{customer.Region}</td>
                <td>{customer.SelectPlan}</td>
                <td>{customer.dateInput}</td>
                <td
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <MdEdit
                    style={{ color: "green", cursor: "pointer" }}
                    onClick={() => handleEdit(customer)}
                  />
                  <MdDelete
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDelete(customer._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Edit Customer Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Customer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCustName">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control
                type="text"
                name="CustName"
                value={customerData.CustName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCustContact">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                name="CustContact"
                value={customerData.CustContact}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCustEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="CustEmail"
                value={customerData.CustEmail}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCustGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                type="text"
                name="CustGender"
                value={customerData.CustGender}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCustBusiness">
              <Form.Label>Business</Form.Label>
              <Form.Control
                type="text"
                name="CustBusiness"
                value={customerData.CustBusiness}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formBusinessType">
              <Form.Label>Business Type</Form.Label>
              <Form.Control
                type="text"
                name="BusinessType"
                value={customerData.BusinessType}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCustRegion">
              <Form.Label>Region</Form.Label>
              <Form.Control
                type="text"
                name="Region"
                value={customerData.Region}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formSelectPlan">
              <Form.Label>Selected Plan</Form.Label>
              <Form.Control
                type="text"
                name="SelectPlan"
                value={customerData.SelectPlan}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formDateInput">
              <Form.Label>Plan Expiry</Form.Label>
              <Form.Control
                type="date"
                name="dateInput"
                value={customerData.dateInput}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewCust;
