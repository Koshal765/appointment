import React, { useEffect, useSyncExternalStore } from 'react'
import { useState } from 'react'
import { Bounce, Slide, ToastContainer, toast } from 'react-toastify';


const Appointment = () => {
  const [data, setData] = useState({
    name: '',
    service: '',
    date: '',
    time: ''
  })
  const [Appointment, SetAppointments] = useState([])

  useEffect(() => {
    const StoredAppointments = JSON.parse(localStorage.getItem("data")) || [];
    SetAppointments(StoredAppointments)
  }, [])

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    notify()
    const StoredAppointments = JSON.parse(localStorage.getItem("data")) || [];
    const updated = [...StoredAppointments, data]
    localStorage.setItem("data", JSON.stringify(updated));
    SetAppointments(updated)
    console.log(data);
    
  }

  const notify = () => toast("Appointmnet Booked!")

  return (
    <>
    <div className='flex justify-center w-full '>
      <div className='bg-gray-50 lg:w-120 md:w-100 sm:w-80 mt-25  px-10 py-4 rounded-2xl shadow-xl/30 mb-5 flex justify-center '>
        <form onSubmit={handleSubmit}>
          <h1 className='text-center text-emerald-600 font-serif text-2xl'>Book Appointment </h1>
          <div className='mt-3'>
            <label>Enter Your Name</label>
            <div>
              <input type='text' name='name' placeholder='eg:amit' value={data.name} onChange={handleChange} className='border rounded-lg lg:w-100 md:w-80 sm:w-50 px-2 py-1  focus:border-emerald-400   outline-none ' required></input>
            </div></div>


          <div className='mt-3'>
            <label>Select Service</label>
            <div>
              <input type='text' name='service' value={data.service} onChange={handleChange} placeholder='eg:haircut,gym,doctor,etc'  className='border-1 rounded-lg lg:w-100 md:w-80 sm:w-50 px-2 py-1 focus:border-emerald-400   outline-none' required></input>
            </div></div>


          <div className='mt-3'>
            <label>Select Date</label>
            <div>
              <input type='date' name='date' value={data.date} onChange={handleChange} className='  border rounded-lg border-black  w-full  px-2 py-1 focus:border-emerald-400   outline-none ' required></input>
            </div>
            </div>

          <div className='mt-3'>
            <label>Select Time</label>
           <div className='w-full'>
              <input type='time' name='time' value={data.time} onChange={handleChange} className='  border rounded-lg border-black w-full  px-2 py-1 focus:border-emerald-400   outline-none ' required></input>
          </div>
          </div>


          <div className='flex justify-center mt-3'>
          <button type='submit'  className='bg-emerald-700 text-white font-semibold px-2 py-2 rounded-2xl  mt-3 lg:w-100 md:w-80 sm:w-50 hover:bg-emerald-600 hover:text-lg'>Save Appointment</button>
          <ToastContainer
            autoClose={3000}
            theme='dark'
            transition={Slide} />
            </div>

        </form>

      </div>
     

    </div>
    <div className='p-5 m-5 shadow-xl/30 rounded-lg w-fu h-auto bg-gray-50'>
    <h1 className='lg:text-2xl md:text-xl sm:text-lg font-semibold text-emerald-600 font-serif'>Appointmnets</h1>
    <div className='overflow-x-auto'>
    <table className='min-w-full mt-5 border-seperate border-2 border-gray-400 md:table-auto sm: col-span-2 '> 
        <thead>
            <tr className='border-2 border-gray-500'>
                <th className='border border-gray-300 px-4 py-2 text-xl'>Name</th>
                <th className='border border-gray-300 px-4 py-2 text-xl'>Service</th>
                <th className='border border-gray-300 px-4 py-2 text-xl'>Date</th>
                <th className='border border-gray-300 px-4 py-2 text-xl'>Time</th>
                <th className='border border-gray-300 px-4 py-2 text-xl'>Action</th>
            
            </tr>
        </thead>
        <tbody>
            {Appointment.map((app, index) => (
                <tr key={index} >    
                    <td className='border border-gray-300 px-4 py-2 text-center'>{app.name}</td>
                    <td className='border border-gray-300 px-4 py-2 text-center'>{app.service}</td>
                  
                    <td className='border border-gray-300 px-4 py-2 text-center'>{app.date}</td>
                    <td className='border border-gray-300 px-4 py-2 text-center'>{app.time}</td>
                    <td className='border border-gray-300 px-4 py-2 '>
                      <div className=' flex justify-around'>
                        <button className='bg-red-500 text-white font-semibold px-3 py-1 rounded-2xl hover:bg-red-700'>Delete</button>
                    <button className=' bg-emerald-600 text-white font-semibold px-4 py-1 rounded-2xl hover:bg-emerald-400'>Edit</button>
                    </div>
                    </td>
                   </tr>
                
            ))}
        </tbody>
    </table>

    </div>
</div>
    </>
  )
}

export default Appointment