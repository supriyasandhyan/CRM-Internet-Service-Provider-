import React, { useState } from "react";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageStyle, setMessageStyle] = useState("black");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await response.json();
      console.log("Response data:", data);

      if (response.ok) {
        setMessage("Registration successful!");
        setMessageStyle("green");
        setUsername("");
        setPassword("");
      } else {
        setMessage(data.message || "Registration failed");
        setMessageStyle("red");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("An error occurred");
      setMessageStyle("red");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Register Admin</h1>

      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="username">
          Username
        </label>
        <input
          className="form-control"
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-block mb-4"
      >
        Register
      </button>

      {message && (
        <div style={{ color: messageStyle }} id="message">
          {message}
        </div>
      )}

      <div className="text-center">
        <p>
          Already have an account? <a href="/admin">Login!</a>
        </p>
      </div>
    </form>
  );
};

export default Register;
