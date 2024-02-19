import logo from "./logo.svg";
import "./App.css";
import LoginSignUp from "./Components/Login-SignUp/LoginSignUp";
import MyComponent from "./Components/Login-SignUp/page.jsx";
import Navbar from "./Components/Navbar.js";
import MyObject from "./Components/Login-SignUp/MyObjects.jsx";
import Contact from "./Components/Login-SignUp/Contact.jsx";
import AddObject from "./Components/Login-SignUp/AddObject.jsx";
import { Route, Routes } from "react-router-dom";
// import LoginSignUp from "./Components/Assets/Login-SignUp/LoginSignUp";
function App() {
  return (
    <div>
      <LoginSignUp />
      <>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<MyComponent />} />
            <Route path="/myobjects" element={<MyObject />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/addObject" element={<AddObject />} />
          </Routes>
        </div>
      </>
    </div>
  );
}

export default App;
