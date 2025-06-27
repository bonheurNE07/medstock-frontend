import { Link, NavLink, useNavigate} from "react-router-dom";
import logo from "../../assets/logo.png";
import { useState, useEffect } from "react";
import { navLinks } from "../../constants/navLinks";
import { useAuth } from "../../contexts/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { isAuthenticated } = useAuth()

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-md bg-white/30 dark:bg-[#202124]/30 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Upemba Logo" className="h-8" />
          <span className="text-xl font-semibold dark:text-white">
            Upemba Medical Stock
          </span>
        </Link>

        {/* Mobile Toggle */}
        <div className="flex md:hidden">
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-500 dark:text-white hover:text-blue-700 focus:outline-none"
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Links */}
        <div
          className={`${
            open
              ? "block absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-md animate-slide-down"
              : "hidden"
          } md:static md:flex md:items-center md:space-x-6 md:space-y-0 space-y-4 md:bg-transparent z-40 px-4 py-4 md:py-0`}
        >
          {navLinks.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm font-medium transition ${
                  isActive
                    ? "text-white bg-blue-700"
                    : "text-gray-700 hover:text-blue-700 dark:text-white dark:hover:text-blue-400"
                }`  
              }
            >
              {label}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <button className="bg-gray-800 text-white text-red-600 hover:text-red-500 px-4 py-2 rounded text-sm font-medium"
            onClick={logout}>
            Logout
            </button>) : (
            <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium"
              onClick={handleLogin}>
            Login
          </button>)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
