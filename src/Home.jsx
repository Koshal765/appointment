import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const Home = () => {
    const [services, setServices] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const storedServices = JSON.parse(localStorage.getItem("services"));
        if (storedServices && storedServices.length > 0) {
            setServices(storedServices);
        } else {
            const defaultServices = [
                {
                    id: 1,
                    name: "Haircut",
                    description: "Professional hair styling and grooming",
                    slots: ["10:00 AM", "11:00 AM", "11:30 AM", "12:30 PM"],
                },
                {
                    id: 2,
                    name: "Doctor Consultation",
                    description: "Meet with our certified doctors",
                    slots: ["9:30 AM", "12:00 PM", "2:00 PM", "4:00 PM"],
                },
                {
                    id: 3,
                    name: "Gym Training",
                    description: "Personal training sessions",
                    slots: ["6:00 AM", "7:00 AM", "5:00 PM", "6:30 PM"],
                },
                {
                    id: 4,
                    name: "Dentist",
                    description: "Comprehensive dental care services",
                    slots: ["10:30 AM", "1:00 PM", "3:00 PM", "5:30 PM"],
                },
                {
                    id: 5,
                    name: "Spa",
                    description: "Relaxing spa treatments and massages",
                    slots: ["11:00 AM", "1:30 PM", "4:00 PM", "6:00 PM"],
                },
                {
                    id: 6,
                    name: "Massage",
                    description: "Therapeutic massage sessions",
                    slots: ["12:00 PM", "2:30 PM", "4:30 PM", "7:00 PM"],
                }
            ];
            localStorage.setItem("services", JSON.stringify(defaultServices));
            setServices(defaultServices);
        }
    }, []);

const loggedInUser = JSON.parse(localStorage.getItem('loggedUser')) || null;

    const handelClick = (serviceName, slot) => {
        if (!loggedInUser) {
        Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please log in to book an appointment.',
        confirmButtonText: 'Go to Login',
        theme: "dark"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }
        navigate(`/book-appointment?service=${encodeURIComponent(serviceName)}&slot=${encodeURIComponent(slot)}`);

    }

    const handleButtonClick =()=>{
       if (!loggedInUser) {
        Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please log in to book an appointment.',
        confirmButtonText: 'Go to Login',
        theme: "dark"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        }
      });
      return;
    }
 navigate('/book-appointment');
    }
    

    return (
        <>
            <div className='min-h-screen  w-full pt-20 '>
                <h1 className='text-3xl font-bold text-center mt-6 text-emerald-600 font-serif'>Welcome to Appointment Scheduler</h1>
                <div className="flex justify-around flex-wrap mt-6"  >
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white shadow-lg rounded-2xl p-5 border border-emerald-200 hover:shadow-2xl transition-all w-75 sm:w-75 md:w-75 lg:w-100 ml-3 mt-4  transform-all hover:scale-105"
                        >
                            <h2 className="text-xl font-semibold text-emerald-600">
                                {service.name}
                            </h2>
                            <p className="text-gray-600 text-sm mt-2">{service.description}</p>


                            <h3 className="mt-4 text-emerald-700 font-medium">Available Slots:</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {service.slots.map((slot, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-emerald-500 text-white rounded-full text-sm cursor-context-menu hover:bg-emerald-600 transition-all"
                                        onClick={() => handelClick(service.name, slot)}>
                                        {slot}
                                    </span>

                                ))}

                            </div>

                        </div>
                    ))}
                    <div className="w-full flex justify-center mt-10 mb-5">
                        <button className='bg-gradient-to-r from-emerald-500 via-teal-500 to-green-400 px-4 py-2 font-serif text-center rounded-full text-white  hover:from-green-500 hover:to-emerald-600 trasition-all hover:scale-105' onClick={handleButtonClick} >
          Book Other Appointments</button>
                    </div>


                </div>

            </div>
        </>
    )
}

export default Home