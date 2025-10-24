import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { toast, ToastContainer,Slide} from 'react-toastify';
import Swal from 'sweetalert2';

const Login = () => {
  const[isLogin,setIsLogin] = useState(false);
  const[user,setUser]=useState({
    username:'',
    password:""
  })

  const[showpass,setShowPass] = useState(true);


  const notify = () =>toast.info("Username Already Exists")
  const navigate = useNavigate()

const handleChange =(e)=>{
  setUser({...user,[e.target.name]:e.target.value})
}
const handleSubmit=(e)=>{
  e.preventDefault();
  const userdata = JSON.parse(localStorage.getItem("users")) || [];
  if(isLogin){
  const matchedUser = userdata.find(u => u.username.trim().toLowerCase() === user.username.trim().toLowerCase() && u.password.trim().toLowerCase() === user.password.trim().toLowerCase());
  if(matchedUser){
      Swal.fire({
      title: "Login Successful!",
      text: `Welcome ${matchedUser.username}!`,
      icon: "success",
      confirmButtonColor: "#10b981", // emerald color
      theme: "dark"
    });
    navigate('/');
  }
  else{
    alert("Invalid Credentials");
  }}
  else{
    const exists = userdata.some((u)=>u.username=== user.username);
    if(exists){
      notify()
    }
    else{
      userdata.push(user)
      localStorage.setItem("users",JSON.stringify(userdata));
 Swal.fire({
      title: "Signup Successful!",
      text: "You can now login.",
      icon: "success",
      confirmButtonColor: "#10b981",
      theme: "dark"
      
    });
      setIsLogin(true);
    }

  }
setUser({username:'' , password:''});
  console.log(user);
};

  return (
    <>
    <div className='min-h-screen  w-full pt-20 flex justify-center  '>
      {isLogin ?  <>
    <div className='border-emerald-400 bg-white border  rounded-2xl shadow-xl w-75 h-100 flex justify-center  mt-15  transition-all hover:shadow-emerald-400/80 hover:scale-101 '>
      <form onSubmit={handleSubmit} className='px-3 mt-5'>
        <h1 className='text-center font-serif text-emerald-500 text-3xl mt-5'>Login</h1>
   
          {/* <label className='font-serif'>Username</label> */}
          <div className='mt-10'>
            <input name='username' type='text' value={user.username} onChange={handleChange} required autoComplete='off' className='border rounded-full w-full focus:border-emerald-400   outline-none px-3 py-1 ' placeholder='Username or email'></input>
          </div>
       
         
          {/* <label className=' font-serif'>Password</label> */}
          <div className='mt-5'>
            <input name='password' type='text' value={user.password} onChange={handleChange} required autoComplete='off' className='border rounded-full w-full focus:border-emerald-400   outline-none px-3 py-1' placeholder='password'></input>
          </div>
        
       
        <div className='flex justify-center mt-8'>
          <button className='bg-gradient-to-r from-emerald-500 via-teal-500 to-green-400 px-4 py-2 font-serif text-center rounded-full w-full text-white ' type='submit'>Login</button>
          </div>
           <div className='mt-5 w-full  flex items-center justify-center gap-1'>
     <p className='text-md'>Create Account?</p><span className=' text-blue-500 hover:text-blue-700'> <a href='#' onClick={()=>setIsLogin(false)} className='cursor-pointer text-sm'>Sign Up</a></span>
        </div>
      </form>
      </div>
      </>:<>
       <div className='border-emerald-400 bg-white border  rounded-2xl shadow-xl w-75 h-100 flex justify-center  mt-15  transition-all hover:shadow-emerald-400/80 hover:scale-101 '>
      <form onSubmit={handleSubmit} className='px-3 mt-5'>
        <h1 className='text-center font-serif text-emerald-500 text-3xl mt-5'>Sign Up</h1>
   
          {/* <label className='font-serif'>Username</label> */}
          <div className='mt-10'>
            <input name='username' type='text' value={user.username} onChange={handleChange} required autoComplete='off' className='border rounded-full w-full focus:border-emerald-400   outline-none px-3 py-1 ' placeholder='Username or email'></input>
          </div>
       
         
          {/* <label className=' font-serif'>Password</label> */}
          <div className='mt-5'>
            <input name='password' type='password' value={user.password} onChange={handleChange} required autoComplete='off' className='border rounded-full w-full focus:border-emerald-400   outline-none px-3 py-1' placeholder='password'></input>
          </div>
        
  
        <div className='flex justify-center mt-8'>
          <button className='bg-gradient-to-r from-emerald-500 via-teal-500 to-green-400 px-4 py-2 font-serif text-center rounded-full w-full text-white ' type='submit'>Sign Up</button>
          </div>
                <div className='mt-5 w-full  flex justify-center items-center gap-1'>
 <p className='text-md'>Have an Account?</p><span className=' text-blue-500 hover:text-blue-700'> <a href='#' onClick={()=>setIsLogin(true)} className='cursor-pointer text-md'>Login</a></span>
        </div>
      </form>

      </div>
      
      </>}
      </div>
      <ToastContainer 
      autoClose={2000}
      transition={Slide}
      theme='dark'/>
    </>
  )
}

export default Login