import { NavLink } from "react-router-dom";
import CL_Logo from "../assets/CL_Logo.png";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <NavLink
          className="navbar-brand d-flex align-items-center gap-2"
          to="/"
        >
          <img
            src={CL_Logo}
            alt="Coaches Lounge Logo"
            className="cl-navbar-logo"
          />
          <span className="brand-mark">COACHES LOUNGE</span>
      </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <NavLink className="nav-link" to="/discover">
                Discover
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/messages">
                Messages
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                Profile
              </NavLink>
            </li>
            <li className="nav-item ms-lg-2">
              <NavLink className="btn btn-danger px-3" to="/discover">
                Join Now
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}