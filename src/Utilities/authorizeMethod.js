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
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/auth/login`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email,
          password,
        },
      }
    );

    // If the request is successful, store the userId in sessionStorage
    if (response.status === 200) {
      sessionStorage.setItem("userId", response.data.userId);
      console.log("Login successful:", response.data.message);
    } else {
      console.error("Login failed:", response.data.message);
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Login error:", error.response.data.message);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Login error: No response from the server");
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Login error:", error.message);
    }
  }
};

export const logout = () => {
  // Remove the userId from sessionStorage to "log out" the user
  sessionStorage.removeItem("userId");
  console.log("User logged out successfully");
};

