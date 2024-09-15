import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      console.log("kaye?: ",response);
     
       if (!response.ok) {
        throw new Error("No credentials found");
      }
      console.log("Login successful");
      onLogin();
      navigate("/dashboard"); 

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <form onSubmit={handleLogin}>
        <h1>Admin Login Here</h1>
        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="form2Example1">
            Username
          </label>
          <input
            type="text"
            id="form2Example1"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div data-mdb-input-init className="form-outline mb-4">
          <label className="form-label" htmlFor="form2Example2">
            Password
          </label>
          <input
            type="password"
            id="form2Example2"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          data-mdb-button-init
          data-mdb-ripple-init
          className="btn btn-primary btn-block mb-4"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <div className="text-danger">{error}</div>}
        <div className="text-center">
          <p>
            Not a member? <a href="/register">Register Here!</a>
          </p>
        </div>
      </form>
    </>
  );
};

export default Admin;
