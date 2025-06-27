import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { navLinks } from "../../constants/navLinks";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#212121] shadow-sm border-t mt-12 transition-all duration-300">
      <div className="max-w-screen-xl mx-auto px-4 py-6 sm:flex sm:items-center sm:justify-between">
        <Link to="/" className="flex items-center space-x-3">
          <img src={logo} className="h-8" alt="Upemba Logo" />
          <span className="text-lg font-semibold dark:text-white">
            Upemba Medical Stock
          </span>
        </Link>

        <ul className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mt-4 sm:mt-0">
          {navLinks.map(({ label, path }) => (
            <li key={path}>
              <Link to={path} className="me-4 hover:underline">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-4 border-t border-gray-200 dark:border-gray-700">
        © {new Date().getFullYear()} Upemba National Park — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
