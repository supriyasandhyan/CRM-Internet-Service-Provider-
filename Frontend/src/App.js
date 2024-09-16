import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import CreatePlan from "./Pages/CreatePlan";
import Employee from "./Pages/Employee";
import Customer from "./Pages/Customer";
import Complaint from "./Pages/Complaint";
import Admin from "./Auth/Admin";
import Register from "./Auth/Register";
import Sidebar from "./MenuBar/Sidebar";
import EmpReport from "./Pages/EmpReport";
import CustReport from "./Pages/CustReport";
import './App.css'
import AdminDashboard from "./Pages/AdminDashboard";
import ViewEmp from "./Pages/ViewEmp";
import EditEmp from "./Pages/EditEmp";
import ViewCust from "./Pages/ViewCust";
import ViewPlans from "./Pages/ViewPlans";

const App = () => {
  const navigate = useNavigate();

  const getInitialMenuItems = () => {
    const savedMenuItems = localStorage.getItem("menuItems");
    return savedMenuItems ? JSON.parse(savedMenuItems) : [
      { label: "Home", path: "/" },
      { label: "About", path: "/about" },
      { label: "Admin", path: "/admin" },
    ];
  };

  const [menuItems, setMenuItems] = useState(getInitialMenuItems);

  const updateMenuItems = (items) => {
    setMenuItems(items);
    localStorage.setItem("menuItems", JSON.stringify(items));
  };

  const handleLogin = () => {
    updateMenuItems([
      { label: "Create Plan", path: "/create-plan" },
      { label: "Employee", path: "/emp" },
      { label: "Customer", path: "/cust" },
      { label: "Complaint", path: "/comp" },
      { label: "Employee Report", path: "/emp-report" },
      { label: "Customer Report", path: "/cust-report" },
      { label: "Logout", path: "/" },
    ]);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");

    updateMenuItems([
      { label: "Home", path: "/" },
      { label: "About", path: "/about" },
      { label: "Admin", path: "/admin" },
    ]);

    setTimeout(() => {
      navigate("/");
      console.log("Navigating to home page...");
    }, 1000); 
  };

  return (
    <div className="app">
      <Sidebar menuItems={menuItems} onLogout={handleLogout} />
      <div className="app-dashboard">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/create-plan" element={<CreatePlan />} />
          <Route path="/viewplan" element={<ViewPlans />} />
          <Route path="/emp" element={<Employee />} />
          <Route path="/viewemp" element={<ViewEmp />} />
          <Route path="/edit-emp/:EmpID" element={<EditEmp />} />
          <Route path="/cust" element={<Customer />} />
          <Route path="/viewcust" element={<ViewCust />} />
          <Route path="/comp" element={<Complaint />} />
          <Route path="/emp-report" element={<EmpReport />} />
          <Route path="/cust-report" element={<CustReport />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
