import React from 'react'
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [users, setUser] = useState(null);
  const [userAppointments, setUserAppointments] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedUser')) || null;
    setUser(loggedInUser);

    const storedAppointments = JSON.parse(localStorage.getItem('data')) || [];
    setAppointments(storedAppointments);


    if (loggedInUser) {
      const filtered = storedAppointments.filter(app => app.name.trim().toLowerCase() === loggedInUser.username.trim().toLowerCase());
      setUserAppointments(filtered);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedUser');
    setUser(null);
    setUserAppointments([]);
     Swal.fire({
          title: "Login Successful!",
          text: `You have been logged out successfully!`,
          icon: "success",
          confirmButtonColor: "#10b981", // emerald color
          theme: "dark"
        });
  };
 


  return (
    <>
      <div className='min-h-screen  w-full pt-20 flex justify-center'>
        <div className='w-full max-w-4xl p-6 rounded-lg shadow-2xl mt-4 border-2 border-emerald-200'>
          <div>
            <h2 className='text-4xl font-serif mb-6 text-center text-emerald-500'>{users ? `Welcome ${users.username}` : 'Please Login'}</h2>
            </div>
          <div>
           
            <div className='mt-5 space-y-4 '>
              {userAppointments.length === 0 ? (
                <p className='font-serif text-2xl'>No appointments found.</p>
              ) : (
                <>
                 <p className='text-xl font-serif mb-4'>
            Here are your appointments:</p>
                {userAppointments.map((app, index) => (
                  <div key={index} className='p-4 rounded-lg shadow-md border border-emerald-500 mt-5'>
                    <p className='text-2xl font-serif text-emerald-500 mb-3'><strong>{app.service}</strong></p>
                    <p className='font-serif '><strong>Date:</strong> {app.date}</p>
                    <p className='font-serif'><strong>Time:</strong> {app.time}</p>
                  </div>
                  
                ))}
               
                   <div className='flex justify-end mt-6'>
            <button className='mt-5  rounded-full px-3 py-1 font-serif bg-red-600 text-white hover:bg-red-700 transition-all hover:scale-105' onClick={handleLogout}>Logout</button>
            </div>
              </>
                
              )}
             

            </div>
             
                  
           
          </div>
        </div>
      </div>
      </>
      )
}

      export default MyAppointments