import React, { useState } from "react";
import "./LoginSignUp.css";

import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";

const LoginSignUp = () => {
  const [action, setAction] = useState("Sign Up");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  // Simple email regex for basic validation
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  // Check if the password meets your criteria (e.g., minimum 1 characters)
  const validatePassword = (password) => {
    return password.length >= 1;
  };

  // Handle form submission
  const handleSubmit = () => {
    let validationErrors = {};
    if (!validateEmail(email)) {
      validationErrors.email = "Invalid email format";
    }
    if (!validatePassword(password)) {
      validationErrors.password = "Password must be at least 8 characters long";
    }

    setErrors(validationErrors);

    // If no errors, proceed with submission (e.g., API call)
    if (Object.keys(validationErrors).length === 0) {
      console.log("Form is valid, proceed with submission");
      // Here, you can add your logic to handle a valid form submission
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={user_icon} alt="user icon" />
            <input type="text" placeholder="Name" />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="email icon" />
          <input
            type="email"
            placeholder="Email Id"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="input">
          <img src={password_icon} alt="password icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
      </div>

      {action === "Sign Up" ? (
        <div></div>
      ) : (
        <div className="forgot-password">
          Lost Password? <span>Click Here!</span>
        </div>
      )}

      <div className="submit-container">
        <div
          className={action === "Login" ? "submit grey" : "submit"}
          onClick={() => {
            setAction("Sign Up");
          }}
        >
          Sign up
        </div>
        <div
          className={action === "Sign Up" ? "submit grey" : "submit"}
          onClick={() => {
            setAction("Login");
          }}
        >
          Login
        </div>
        <button className="submit" onClick={handleSubmit}>
          {action}
        </button>
      </div>
    </div>
  );
};

export default LoginSignUp;
