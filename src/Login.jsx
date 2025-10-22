import React, { useState } from 'react'

const Login = () => {
  const[user,setUser]=useState({
    username:'',
    password:""
  })

const handleChange =(e)=>{
  setUser({...user,[e.target.name]:e.target.value})
}
const handleSubmit=(e)=>{
  e.preventDefault();
  
  console.log(user);
}

  return (
    <>
    <div className='min-h-screen  w-full pt-20 flex justify-center  '>
    <div className='border-emerald-400  border  rounded-2xl shadow-2xl w-100 h-75 flex justify-center items-center mt-15'>
      <form onSubmit={handleSubmit} className='px-3 '>
        <h1 className='text-center font-serif text-emerald-500'>Login</h1>
        <div>
          <label className='font-serif'>Username</label>
          <div>
            <input name='username' type='text' value={user.username} onChange={handleChange} required autoComplete='off' className='border rounded-xl  focus:border-emerald-400   outline-none px-2 '></input>
          </div>
        </div>
         <div>
          <label className=' font-serif'>Password</label>
          <div>
            <input name='password' type='password' value={user.password} onChange={handleChange} required autoComplete='off' className='border rounded-xl  focus:border-emerald-400   outline-none px-2 '></input>
          </div>
        </div>
        <div>
     <h1>Create Account ?</h1>
        </div>
        <div className='flex justify-center'>
          <button className='bg-emerald-600 px-4 py-1 font-serif text-center rounded-2xl text-white ' type='submit'>Login</button>
          </div>
      </form>
      </div></div>
    </>
  )
}

export default Login