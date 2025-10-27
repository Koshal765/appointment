import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import { FiMenu , FiX } from "react-icons/fi";
import { useNavigate } from 'react-router';

const Navbar = () => {

  const [isOpen,setIsOpen]= useState(false);
  const toggleMenu = () => setIsOpen(!isOpen)
  const [user , setUser] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedUser')) || null;
    setUser(loggedInUser);
  }, []);

const logout=()=>{
  localStorage.removeItem('loggedUser');
  setUser(null);
  setAppointments([]);
  navigate('/login');
};

const login=()=>{
  navigate('/login');
};

return (
    <nav className="bg-gradient-to-r from-emerald-500 via-teal-500 to-green-400 shadow-2xl rounded-b-xl fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl md:text-2xl lg:text-3xl font-serif text-white "><Link to="/">   Appointment Scheduler</Link>
       
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-lg text-white font-serif">
         
         <Link to="/" className="hover:text-gray-200 transition ">Home</Link>

          <Link to="/book-appointment" className="hover:text-gray-200 transition ">
            Book Appointment
          </Link>
          <Link to="/my-appointments" className="hover:text-gray-200 transition">
            My Appointments
          </Link>
          {user ? (
            <button className='bg-red-600 text-white rounded-full text-sm px-2 py-1 transition-all hover:scale-105 hover:bg-red-700' onClick={logout}>Logout</button> ): 
          (
         <button className=' text-white  transition hover:text-gray-200' onClick={login}>Login</button>
            
        )}
       
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
          <ul className="flex flex-col items-center py-4 space-y-4 text-md text-emerald-500 font-serif">
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
                to="/book-appointment"
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-200"
              >
                Book Appointments
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