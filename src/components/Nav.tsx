import { NavLink, useLocation } from 'react-router-dom';

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages
  const location = useLocation();
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink
            to="/"
            className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/SavedCandidates"
            className={
              location.pathname === '/SavedCandidates'
                ? 'nav-link active'
                : 'nav-link'
            }
          >
            Potential Candidates
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
