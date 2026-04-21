import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function Nav() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isAdmin = user && user.role === "admin";

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm mb-4">
        <div className="container-fluid px-4">
          <Link className="navbar-brand fw-bold text-primary" to={isAdmin ? "/admin" : "/"}>
            DentalClinic {isAdmin && <span className="badge bg-danger fs-6 ms-2">Admin View</span>}
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              
              {/* ADMIN VIEW LINKS */}
              {isAdmin && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link fw-semibold" to="/admin">
                      Manage Appointments
                    </Link>
                  </li>
                </>
              )}

              {/* REGULAR USER / GUEST VIEW LINKS */}
              {!isAdmin && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link fw-semibold" aria-current="page" to="/">
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fw-semibold" to="/services">
                      Services
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fw-semibold" to="/appointment">
                      Book Appointment
                    </Link>
                  </li>
                </>
              )}

            </ul>

            {/* AUTHENTICATION / LOGOUT SECTION */}
            <div className="d-flex align-items-center gap-3">
              {user ? (
                <>
                  <span className="text-secondary fw-semibold">Hi, {user.name}</span>
                  <button onClick={handleLogout} className="btn btn-outline-danger btn-sm px-3 fw-bold rounded-pill">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-primary btn-sm px-3 fw-bold rounded-pill">
                    Login
                  </Link>
                  <Link to="/signup" className="btn btn-primary btn-sm px-3 fw-bold rounded-pill">
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
