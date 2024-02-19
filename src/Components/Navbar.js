import { Link, useMatch, useResolvedPath } from "react-router-dom";
import CatchIt from "./Assets/CatchIt.png";
import { logout } from "../Utilities/authorizeMethod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {

  const { setUserId } = useAuth();
  const navigate = useNavigate();

  const isLoggedIn = sessionStorage.getItem("userId") !== null;

  const handleLogoutClick = () => {
    logout(setUserId);
    navigate('/login');
  };

  return (
    <nav className="nav">
      <img src={CatchIt} alt="Logo" height="50px" width="100px" />
      <ul>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/myObjects">MyObjects</CustomLink>
        <CustomLink to="/contact">Contact</CustomLink>
        <CustomLink to="/addObject">Add Object</CustomLink>
        {isLoggedIn && (
          <li class="logout-button-container">
          <button onClick={handleLogoutClick}>Logout</button>
      </li>
        )}
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  //react router
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
