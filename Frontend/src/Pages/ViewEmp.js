import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Modal, Button, Form } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const ViewEmp = () => {
  const [Employees, setEmployees] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEmp, setCurrentEmp] = useState(null);
  const [empData, setEmpData] = useState({
    EmpName: "",
    EmpContact: "",
    EmpEmail: "",
    EmpLocation: "",
  });

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/get-emp");
      setEmployees(response.data);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/delete-emp/${id}`);
      setEmployees(Employees.filter((employee) => employee.EmpID !== id));
    } catch (err) {
      console.error("Failed to delete employee:", err);
    }
  };

  const handleEdit = (employee) => {
    setCurrentEmp(employee);
    setEmpData({
      EmpName: employee.EmpName,
      EmpContact: employee.EmpContact,
      EmpEmail: employee.EmpEmail,
      EmpLocation: employee.EmpLocation,
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmpData({
      ...empData,
      [name]: value,
    });
  };

  const handleSubmitEdit = async () => {
    try {
      await axios.put(`http://localhost:8080/api/v1/edit-emp/${currentEmp.EmpID}`, empData);
      setEmployees(Employees.map(emp =>
        emp.EmpID === currentEmp.EmpID ? { ...emp, ...empData } : emp
      ));
      setShowEditModal(false);
    } catch (err) {
      console.error("Failed to update employee:", err);
    }
  };

  return (
    <div>
      <h3>View Employees</h3>

      <div className="container mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Emp Name</th>
              <th>Contact</th>
              <th>Emp Email</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Employees.map((Employee) => (
              <tr key={Employee._id}>
                <td>{Employee.EmpID}</td>
                <td>{Employee.EmpName}</td>
                <td>{Employee.EmpContact}</td>
                <td>{Employee.EmpEmail}</td>
                <td>{Employee.EmpLocation}</td>
                <td
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <MdEdit
                    style={{ color: "green", cursor: "pointer" }}
                    onClick={() => handleEdit(Employee)}
                  />
                  &nbsp;
                  <MdDelete
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDelete(Employee.EmpID)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Edit Employee Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formEmpName">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                type="text"
                name="EmpName"
                value={empData.EmpName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmpContact">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                name="EmpContact"
                value={empData.EmpContact}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmpEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="EmpEmail"
                value={empData.EmpEmail}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formEmpLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="EmpLocation"
                value={empData.EmpLocation}
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

export default ViewEmp;
