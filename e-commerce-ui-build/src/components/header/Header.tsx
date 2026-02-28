import { Link, useLocation } from "react-router-dom";
import "./Header.css";

interface HeaderProps {
  isLoggedIn: boolean;
  onLogout: () => void;
  userName?: string;
}

export default function Header({ isLoggedIn, onLogout, userName }: HeaderProps) {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">✦</span>
          <span className="logo-text">Luxe Glow</span>
        </Link>

        <nav className="nav-links">
          {isLoggedIn ? (
            <>
              <Link
                to="/"
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
              >
                Shop
              </Link>
              <span className="nav-greeting">Hi, {userName || "Guest"}</span>
              <button onClick={onLogout} className="nav-btn logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`nav-btn login-link ${location.pathname === "/login" ? "active" : ""}`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`nav-btn register-link ${location.pathname === "/register" ? "active" : ""}`}
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>

        {/* Mobile menu */}
        <div className="mobile-nav">
          {isLoggedIn ? (
            <div className="mobile-nav-inner">
              <span className="nav-greeting-mobile">Hi, {userName || "Guest"}</span>
              <button onClick={onLogout} className="nav-btn logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="mobile-nav-inner">
              <Link to="/login" className="nav-btn login-link">
                Login
              </Link>
              <Link to="/register" className="nav-btn register-link">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
