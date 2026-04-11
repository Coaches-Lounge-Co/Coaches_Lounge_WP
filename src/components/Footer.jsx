import { FaInstagram } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container text-center">
        <div className="d-flex justify-content-center gap-4 mb-4">
          <a
            href="https://www.instagram.com/coaches.lounge/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white fs-4"
          >
            <FaInstagram />
          </a>
        </div>

        <p className="mb-3 fs-5">
          Sign up and join the community.
        </p>

        <NavLink
          to="/auth"
          className="btn btn-danger fw-semibold px-4 py-2 mb-4"
        >
          JOIN NOW
        </NavLink>

        <div className="d-flex justify-content-center gap-4 flex-wrap small mb-3">
          <NavLink to="/faq" className="text-decoration-none text-white-50">
            FAQ
          </NavLink>

          <NavLink to="/terms" className="text-decoration-none text-white-50">
            Terms of Use
          </NavLink>

          <NavLink to="/privacy" className="text-decoration-none text-white-50">
            Privacy Policy
          </NavLink>

          <NavLink to="/contact" className="text-decoration-none text-white-50">
            Contact Us
          </NavLink>
        </div>

        <div className="small text-white-50">
          © {new Date().getFullYear()} Coaches Lounge LLC
        </div>

        <div className="small mt-2">
          Powered by{" "}
          <a
            href="https://blackburn.works"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-decoration-none fw-semibold"
          >
            Blackburn Works LLC
          </a>
        </div>

      </div>
    </footer>
  );
}
