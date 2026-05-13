import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../util';
import Logo from '../src/components/Logo';

function Signup() {
    const navigate = useNavigate();

    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
    });

    function handleChange(e) {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!signupData.name || !signupData.email || !signupData.password) {
            return handleError("Please fill all the fields");
        }
        try {
            const url = "http://localhost:5000/auth/signup";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(signupData),
            });
            const result = await response.json();
            const { success, message, error } = result;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/login");
                }, 500);
            }
            else if(error){
                handleError(error.details[0].message);
            }
            else if(!success){
                handleError(message);
            }
            
        }
        catch (error) {
            handleError(error);
        }
    }
  return (

    <div className="min-h-screen bg-[#202021] px-4 text-white relative overflow-hidden">

  <div className="relative z-10 min-h-screen flex items-center justify-center">

    <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center md:justify-between gap-12">

      {/* LEFT SIDE - LOGO (hidden on small screens) */}
      <div className="hidden md:flex flex-1 items-center justify-center">
        
        <div className="flex flex-col items-center text-center space-y-6">

          {/* Logo with glow */}
          <div className="scale-[2] drop-shadow-[0_0_25px_rgba(110,240,247,0.6)] transition-transform duration-500 hover:scale-[2.1]">
            <Logo />
          </div>

          {/* Tagline */}
          <p className="text-slate-300 text-base max-w-xs">
            Join TypeMaster and level up your typing 🚀
          </p>

        </div>

      </div>

      {/* RIGHT SIDE - SIGNUP FORM */}
      <div className="flex-1 flex justify-center w-full">

        <div className="
          bg-[#19191a]
          p-6 sm:p-8 
          rounded-2xl 
          shadow-2xl shadow-black/85
          w-full 
          max-w-lg md:max-w-md 
          border-2 border-slate-600/50
          backdrop-blur-md
          hover:shadow-2xl hover:shadow-black/70 hover:border-slate-500 transition-all duration-300
        ">

          {/* Title */}
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Sign Up
          </h2>

                   <form onSubmit={(e) => handleSubmit(e)}>
            
            <div className="mb-4">
              <label className="block text-slate-300 mb-2">Name</label>
              <input 
                type="text" 
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-slate-400" 
                placeholder="Enter your name" 
                name="name"  
                value={signupData.name}  
                onChange={(e) => handleChange(e)} 
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-slate-300 mb-2">Email</label>
              <input 
                type="email" 
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-slate-400" 
                placeholder="Enter your email" 
                name="email"  
                value={signupData.email}  
                onChange={(e) => handleChange(e)} 
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-slate-300 mb-2">Password</label>
              <input 
                type="password" 
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-slate-400" 
                placeholder="Enter your password" 
                name="password"  
                value={signupData.password}  
                onChange={(e) => handleChange(e)}  
              />
            </div>
            
            <button type="submit" className=" w-full bg-linear-to-r from-cyan-500 to-cyan-600 text-white py-2 rounded-md
    transition-all duration-200 ease-in-out
    hover:from-cyan-600 hover:to-cyan-700 hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30
    active:scale-95 active:shadow-inner
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
              Submit
            </button>
          </form>

          {/* Bottom link */}
          <div className="mt-4 text-center">
            <p className="text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="text-cyan-400 hover:text-cyan-300 hover:underline">
                Log in
              </Link>
            </p>
          </div>

        </div>

      </div>

    </div>

  </div>
</div>

   
  )
    }

    export default Signup;