import { Link, useMatch, useResolvedPath } from "react-router-dom";
import CatchIt from "./Assets/CatchIt.png";

export default function Navbar() {
  return (
    <nav className="nav">
      <img src={CatchIt} alt="Logo" height="50px" width="100px" />
      <ul>
        <CustomLink to="/">Home</CustomLink>
        <CustomLink to="/myObjects">MyObjects</CustomLink>
        <CustomLink to="/contact">Contact</CustomLink>
        <CustomLink to="/addObject">Add Object</CustomLink>
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
