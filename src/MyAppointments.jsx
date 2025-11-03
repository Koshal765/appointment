import React from 'react'
import { useState, useEffect } from 'react'
import { RiServiceLine } from "react-icons/ri";
import { toast ,ToastContainer,Slide} from 'react-toastify';
 
import { useNavigate } from 'react-router';

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

  const deleteAppointment = (index) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;
    const updatedAppointments = [...userAppointments];
    updatedAppointments.splice(index, 1);
    setUserAppointments(updatedAppointments);
    const allAppointments = appointments.filter(app => app.name.trim().toLowerCase() !== users.username.trim().toLowerCase());
    const newAppointments = [...allAppointments, ...updatedAppointments];
    setAppointments(newAppointments);
    localStorage.setItem('data', JSON.stringify(newAppointments));
    deletenotify();
  }

const editAppointment = (index) => {
    // Implement edit functionality here
    const appointmentToEdit = userAppointments[index];
     const globalIndex = appointments.findIndex(
    (app) =>
      app.name.trim().toLowerCase() === appointmentToEdit.name.trim().toLowerCase() &&
      app.service === appointmentToEdit.service &&
      app.date === appointmentToEdit.date &&
      app.time === appointmentToEdit.time
  );

    console.log('Edit appointment:', appointmentToEdit);
    // You can navigate to the edit page and pass the appointment details
    navigate('/book-appointment', { state: { appointment: appointmentToEdit,index: globalIndex } });


  }


  const navigate = useNavigate();

  const BookAppointment=()=>{
    navigate('/');
  }

  const current = new Date();
  const date= current.toLocaleDateString();
  const time = current.toLocaleTimeString();

  const deletenotify = () => toast.success("Appointment Deleted Successfully")

  return (
    <>
      <div className='min-h-screen  w-full pt-20 flex justify-center'>
        <div className='w-full max-w-6xl p-6 rounded-lg shadow-2xl mt-4 border-2 border-emerald-200 '>
          <div>
            <h2 className='text-4xl font-serif mb-6 text-center text-emerald-500'>{users ? `Welcome ${users.username}` : 'Please Login'}</h2>
            </div>
          <div>
           
            <div className='mt-5 space-y-4  '>
              
              {userAppointments.length === 0 ? (
                <p className='font-serif text-2xl'>No appointments found.</p>
              ) : (
                <>
                 <p className='text-xl font-serif mb-4'>
            Here are your appointments:</p>
            <div className='flex justify-around flex-wrap gap-5 '>
                {userAppointments.map((app, index) => (
                  <div key={index} className='p-4 rounded-2xl shadow-md border border-emerald-500 mt-5 w-80  hover:shadow-emerald-400/100 hover:scale-105 transition-all bg-gray-50 hover:border-2'>
                    <p className='text-2xl font-serif text-emerald-500 mb-3 flex items-center gap-2'><RiServiceLine size={20} className='text-emerald-900'/><strong>{app.service}</strong></p>
                    <p className='font-serif '><strong>Date:</strong> {app.date}</p>
                    <p className='font-serif'><strong>Time:</strong> {app.time}</p>
                 
                    <div className='flex justify-start gap-2 mt-3 text-sm lg:text-base '>
                      <button className='bg-red-500 text-white font-semibold px-3 py-1 rounded-2xl hover:bg-red-700' onClick={() => deleteAppointment(index)}>Delete</button>
                      <button className=' bg-emerald-600 text-white font-semibold px-4 py-1 rounded-2xl hover:bg-emerald-400' onClick={() => editAppointment(index)}>Edit </button>
                    </div>   <div className='bg-emerald-700 w-full h-0.5 mt-3'></div>
                    <p className='font-serif text-gray-500 mt-3'><span className='text-emerald-500'>Booked on:</span>{date} at:{time}</p>
                  </div>
                  
                  
                ))}

                
                </div>
              </>
                
              )}
             
             <div className='flex justify-center lg:justify-start mt-8 '>  <button className='bg-gradient-to-r from-emerald-500 via-teal-500 to-green-400 px-4 py-2 font-serif text-center rounded-full  text-white  hover:from-green-500 hover:to-emerald-600 transition-all hover:scale-105' type='button' onClick={BookAppointment}>Book Appointment</button></div>

            </div>
             
                  
           
          </div>
        </div>
        
      </div> 
       <ToastContainer autoClose={2000} theme='dark' transition={Slide} closeOnClick:true   draggable:true/>
      </>
      )
}

      export default MyAppointments