import { Outlet, Link } from "react-router-dom";
import ToggleTheme from '../ToggleTheme/ToggleTheme'; // Add this import

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/projects">Projects</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <ToggleTheme />
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;