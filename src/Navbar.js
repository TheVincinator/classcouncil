import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const baseClass =
    "text-red-600 font-bold relative cursor-pointer transition-colors duration-300 hover:text-red-800 after:content-[''] after:absolute after:w-full after:h-[2px] after:bg-red-600 after:left-0 after:bottom-[-4px] after:transition-transform after:duration-300";

  const linkClass = ({ isActive }) =>
    isActive
      ? `${baseClass} text-red-800 after:scale-x-100`
      : `${baseClass} after:scale-x-0 hover:after:scale-x-100`;

  const navLinks = [
    { to: "/Events", label: "EVENTS" },
    { to: "/Team", label: "LEADERSHIP TEAM" },
    { to: "/About", label: "ABOUT US" },
    { to: "/Join", label: "APPLY" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full bg-red-200 bg-opacity-90 backdrop-blur-lg shadow-md z-50">
      <div className="flex flex-row items-center justify-between bg-red-200 px-4">
        {/* Logo */}
        <NavLink className={linkClass} to="/">
          <img
            className="pl-1 contrast-125 brightness-90"
            src="crest.png"
            alt="Cornell Class Councils"
            width="100"
          />
        </NavLink>

        {/* Desktop nav */}
        <div className="hidden md:flex flex-row gap-x-10 items-center justify-center pr-6">
          {navLinks.map(({ to, label }) => (
            <NavLink key={to} className={linkClass} to={to}>
              {label}
            </NavLink>
          ))}
        </div>

        {/* Hamburger button (mobile only) */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-1.5 p-2"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-red-600 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-red-600 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-red-600 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden flex flex-col bg-red-200 px-6 pb-4 gap-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              className={linkClass}
              to={to}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
}

export default Navbar;
