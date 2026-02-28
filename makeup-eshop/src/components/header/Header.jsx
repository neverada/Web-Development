import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    closeMobileMenu();
    navigate('/');
  };

  return (
    <header className="bg-background border-b-2 border-primary sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl md:text-3xl font-bold text-primary hover:text-accent transition-colors duration-300"
          onClick={closeMobileMenu}
        >
          Glamour<span className="text-accent">Beauty</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex gap-8">
            <li>
              <Link 
                to="/" 
                className="text-typography font-medium hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/" 
                className="text-typography font-medium hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                Shop
              </Link>
            </li>
            <li>
              <Link 
                to="/" 
                className="text-typography font-medium hover:text-primary transition-colors duration-300 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 hover:after:w-full"
              >
                About
              </Link>
            </li>
          </ul>

          {/* Auth Buttons / User Menu */}
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-typography font-medium">
                Hello, <span className="text-primary font-semibold">{user.name}</span>
              </span>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg font-medium border-2 border-secondary text-typography hover:bg-secondary transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link 
                to="/login" 
                className="px-5 py-2 rounded-lg font-medium border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-300"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-5 py-2 rounded-lg font-medium bg-primary text-white border-2 border-primary hover:bg-accent hover:border-accent transition-colors duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-primary"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <div className="flex flex-col gap-1.5 w-6">
            <span 
              className={`block h-0.5 bg-primary rounded transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span 
              className={`block h-0.5 bg-primary rounded transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span 
              className={`block h-0.5 bg-primary rounded transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Navigation */}
      <nav 
        className={`md:hidden absolute top-full left-0 right-0 bg-background border-b-2 border-primary shadow-lg transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <ul className="flex flex-col p-4 gap-2">
          <li>
            <Link 
              to="/" 
              className="block px-4 py-3 text-typography font-medium rounded-lg hover:bg-secondary transition-colors duration-300"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/" 
              className="block px-4 py-3 text-typography font-medium rounded-lg hover:bg-secondary transition-colors duration-300"
              onClick={closeMobileMenu}
            >
              Shop
            </Link>
          </li>
          <li>
            <Link 
              to="/" 
              className="block px-4 py-3 text-typography font-medium rounded-lg hover:bg-secondary transition-colors duration-300"
              onClick={closeMobileMenu}
            >
              About
            </Link>
          </li>
        </ul>

        {/* Mobile Auth */}
        <div className="flex flex-col gap-2 p-4 border-t border-secondary">
          {user ? (
            <>
              <span className="text-center text-typography font-medium py-2">
                Hello, <span className="text-primary font-semibold">{user.name}</span>
              </span>
              <button 
                onClick={handleLogout}
                className="w-full px-4 py-3 rounded-lg font-medium border-2 border-secondary text-typography hover:bg-secondary transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="w-full px-4 py-3 rounded-lg font-medium border-2 border-primary text-primary text-center hover:bg-primary hover:text-white transition-colors duration-300"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="w-full px-4 py-3 rounded-lg font-medium bg-primary text-white text-center border-2 border-primary hover:bg-accent hover:border-accent transition-colors duration-300"
                onClick={closeMobileMenu}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;