import React, { useState } from 'react'
import { Link } from 'react-router'
import { FiMenu , FiX } from "react-icons/fi";

const Navbar = () => {

  const [isOpen,setIsOpen]= useState(false);
  const toggleMenu = () => setIsOpen(!isOpen)

return (
    <nav className="bg-emerald-500 shadow-2xl rounded-b-xl fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl md:text-2xl lg:text-3xl font-serif text-white ">
          Appointment Manager
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-lg text-white font-serif">
          <Link to="/" className="hover:text-gray-200 transition">
            Home
          </Link>
          <Link to="/my-appointments" className="hover:text-gray-200 transition">
            My Appointments
          </Link>
          <Link to="/login" className="hover:text-gray-200 transition">
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden  bg-gray-200  shadow-lg rounded-b-xl">
          <ul className="flex flex-col items-center py-4 space-y-4 text-lg text-emerald-500 font-serif">
            <li>
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/my-appointments"
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-200"
              >
                My Appointments
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-200"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar