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

  const reset = ()=>{
    setData({
    name: '',
    service: '',
    date: '',
    time: ''
    })
  }
  const [Appointment, SetAppointments] = useState([])
   const [editIndex,SeteditIndex] = useState( null)

  useEffect(() => {
    const StoredAppointments = JSON.parse(localStorage.getItem("data")) || [];
    SetAppointments(StoredAppointments)
  }, [])

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const StoredAppointments = JSON.parse(localStorage.getItem("data")) || [];

    if(editIndex !== null){
   
   StoredAppointments[editIndex]= data
   localStorage.setItem("data", JSON.stringify(StoredAppointments));
    SetAppointments(StoredAppointments)
    SeteditIndex(null);
    console.log(data); 
    editnotify()
    }
    else{
  const updated = [...StoredAppointments, data];
  localStorage.setItem("data",JSON.stringify(updated))
  SetAppointments(updated);
  notify();
    }
    
    reset();
    
    const section = document.getElementById('appointments');
    section.scrollIntoView({ behavior: 'smooth' });

  }

  const Delete = (index)=>{
    if(window.confirm("Do you want to delete this?")){
         const StoredAppointments = JSON.parse(localStorage.getItem("data")) || [];
         StoredAppointments.splice(index,1)
         localStorage.setItem("data",JSON.stringify(StoredAppointments))
         SetAppointments(StoredAppointments);
         deletenotify(); 
  }  
   
  }

const Edit =(index)=>{
     const StoredAppointments = JSON.parse(localStorage.getItem("data"))||[];
     const selected= StoredAppointments[index];
     setData(selected)
     SeteditIndex(index);
}


  const notify = () => toast.success("Appointmnet Saved Succesfully")
  const deletenotify=()=> toast.success("Appointment Deleted Succesfully")
  const editnotify=()=>toast.info("Appointment Updated Succesfully")

  return (
    <>
    <div className='flex justify-center w-full '>
      <div className='bg-orange-50 lg:w-120 md:w-100 sm:w-80 mt-25  px-10 py-4 rounded-2xl shadow-xl/30 mb-5 flex justify-center hover:shadow-emerald-500/100 transition-all hover:scale-101 '>
        <form onSubmit={handleSubmit}>
          <h1 className='text-center text-emerald-600 font-serif text-xl md:text-2xl lg:2xl'>Book Appointment </h1>
          <div className='mt-5'>
            {/* <label>Enter Your Name</label> */}
            <div>
              <input type='text' name='name' placeholder='Your Name' value={data.name} onChange={handleChange} className='  border-none shadow-inner pl-5 rounded-2xl lg:w-100 md:w-80 sm:w-50 px-2 py-2  focus:ring focus:ring-emerald-400   focus:outline-none focus:bg-cyan-50  ' required autoComplete='off'></input>
            </div></div>


          <div className='mt-5'>
            {/* <label>Select Service</label> */}
            <div>
              <input type='text' name='service' value={data.service} onChange={handleChange} placeholder='eg:haircut,gym,doctor,etc'  className='border-none rounded-2xl lg:w-100 md:w-80 sm:w-50 px-2 py-2  pl-5 shadow-inner focus:ring focus:ring-emerald-400   focus:outline-none focus:bg-cyan-50 ' required autoComplete='off'></input>
            </div></div>


          <div className='mt-5'>
            {/* <label>Select Date</label> */}
            <div>
              <input type='date' name='date' value={data.date} onChange={handleChange} className='  border-none rounded-2xl shadow-inner pl-5 w-full  px-2 py-2 focus:ring focus:ring-emerald-400   focus:outline-none  focus:bg-cyan-50 ' required placeholder='date'></input>
            </div>
            </div>

          <div className='mt-5'>
            {/* <label>Select Time</label> */}
           <div className='w-full'>
              <input type='time' name='time' value={data.time} onChange={handleChange} className='  border-none rounded-2xl shadow-inner pl-8 w-full  px-2 py-2 focus:ring focus:ring-emerald-400   focus:outline-none  focus:bg-cyan-50 ' placeholder='time' required></input>
          </div>
          </div>


          <div className='flex justify-center mt-3'>
          <button type='submit'  className='bg-gradient-to-r from-emerald-500 via-teal-500 to-green-400 text-white font-semibold px-2 py-2 rounded-2xl shadow-md  mt-3 w-full  hover:from-green-500 hover:to-emerald-600 transition-all hover:shadow-emerald-400/50 hover:scale-105'>{editIndex !== null ?"Update Appointment" : "Save Appointment"}</button>
          
            </div>

        </form>

      </div>
     

    </div>
    <div className='p-5 m-5 shadow-xl/30 rounded-lg w-fu h-auto ' id='appointments'>
    <h1 className='lg:text-2xl md:text-xl sm:text-lg font-semibold text-emerald-600 font-serif text-center'>Appointments</h1>
    {/* <div className='overflow-x-auto'>
    <table className='min-w-full mt-5 border-separate border-2 border-emerald-600 md:table-auto sm: col-span-2 '> 
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
                        <button className='bg-red-500 text-white font-semibold px-3 py-1 rounded-2xl hover:bg-red-700'onClick={()=>Delete(index)}>Delete</button>
                    <button className=' bg-emerald-600 text-white font-semibold px-4 py-1 rounded-2xl hover:bg-emerald-400' onClick={()=>Edit(index)}>Edit</button>
                    </div>
                    </td>
                   </tr>
                
            ))}
        </tbody>
    </table>

    </div> */}<div className='flex justify-center flex-wrap gap-5 mt-5'>
    {Appointment.map((app, index) => (
      <div key={index} className='border-2 w-75 h-auto bg-gray-50 border-emerald-400 rounded-2xl shadow-md p-5 my-4 hover:shadow-emerald-400/50 transition-all text-start hover:scale-105'>
        <h2 className='font-serif font-semibold text-emerald-600 lg:text-3xl md:text-lg sm:text-md py-2'> {app.name}</h2>
        <p className='font-serif lg:text-lg md:text-lg sm:text-md  '>Service: {app.service}</p>
        <p className='font-serif lg:text-lg md:text-lg sm:text-md '>Date: {app.date}</p>
        <p className='font-serif lg:text-lg md:text-lg sm:text-md '>Time: {app.time}</p>
        <div className='flex justify-start gap-4 mt-2 '>
        <button className='bg-red-500 text-white font-semibold px-3 py-1 rounded-2xl hover:bg-red-700'onClick={()=>Delete(index)}>Delete</button>
        <button className=' bg-emerald-600 text-white font-semibold px-4 py-1 rounded-2xl hover:bg-emerald-400' onClick={()=>Edit(index)}>Edit</button>
        </div>
      </div>
    ))}
</div>
</div>
<ToastContainer autoClose={2000} theme='dark' transition={Slide} />
    </>
  )
}

export default Appointment