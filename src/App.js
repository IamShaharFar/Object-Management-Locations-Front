import logo from "./logo.svg";
import "./App.css";
import Login from "./Components/Login-SignUp/LoginComponent.jsx";
import SignUp from "./Components/Login-SignUp/SignUpComponent.jsx";
import MyComponent from "./Components/Login-SignUp/page.jsx";
import Navbar from "./Components/Navbar.js";
import MyObject from "./Components/Login-SignUp/MyObjects.jsx";
import Contact from "./Components/Login-SignUp/Contact.jsx";
import AddObject from "./Components/Login-SignUp/AddObject.jsx";
import { Route, Routes } from "react-router-dom";
import { withAuth } from "./Utilities/authorizeMethod.js";

function App() {
  const AuthHome = withAuth(MyComponent)
  const AuthMyObjects = withAuth(MyObject)
  return (
    <div>
      <>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<AuthHome/>} />
            <Route path="/myobjects" element={<AuthMyObjects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/addObject" element={<AddObject />} />
          </Routes>
        </div>
      </>
    </div>
  );
}

export default App;
