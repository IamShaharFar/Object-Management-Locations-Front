import React from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export const withAuth = (WrappedComponent) => {
  return (props) => {
    // Check if userId exists in sessionStorage
    const isLoggedIn = sessionStorage.getItem("userId");

    // If logged in, render the wrapped component
    if (isLoggedIn) {
      return <WrappedComponent {...props} />;
    }

    // If not logged in, redirect to login page
    return <Navigate to="/login" />;
  };
};

export const login = async (email, password) => {
  try {
    console.log("login", email, password);
    console.log(process.env.REACT_APP_SERVER_URL);

    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password 
      })
    });

    const data = await response.json();

    console.log(data);

    // If the request is successful, store the userId in sessionStorage
    if (response.status === 200) {
      sessionStorage.setItem("userId", data.userId); // Use data.userId instead of response.data.userId
      console.log("Login successful:", data.message);
    } else {
      console.error("Login failed:", data.message);
    }

  } catch (error) {
    console.error("Login error:", error);
  }
};


export const logout = () => {
  // Remove the userId from sessionStorage to "log out" the user
  sessionStorage.removeItem("userId");
  console.log("User logged out successfully");
};

