import React, { useState } from "react";
import "./SignUpComponent.css"; // Ensure to create this CSS file

const SignUpComponent = () => {
  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const handleSignUpClick = () => {
    alert("Sign Up Clicked!", name, secondName, phoneNumber, email);
    // Here you would typically handle the form submission to your backend
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2 style={{ color: "#6A0DAD" }}>Sign Up</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="signup-input"
        />
        <input
          type="text"
          placeholder="Second Name"
          value={secondName}
          onChange={(e) => setSecondName(e.target.value)}
          className="signup-input"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="signup-input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="signup-input"
        />
        <button onClick={handleSignUpClick} className="signup-button">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUpComponent;
