import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useState, useEffect } from "react";
import { navLinks } from "../../constants/navLinks";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 z-50 w-full dark:bg-gray-900 dark:border-gray-700">
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
              onClick={() => setOpen(false)} // close on click (mobile)
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

          <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
