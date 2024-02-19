import React, { useState } from "react";
import { login } from "../../Utilities/authorizeMethod";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import "./LoginComponent.css";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserId } = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    const loginSuccess = await login(email, password, setUserId);
    if (loginSuccess) {
      navigate('/');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 style={{ color: "#6A0DAD" }}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleClick} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;
