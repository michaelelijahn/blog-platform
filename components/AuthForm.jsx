"use client"
import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthForm = ({ title, buttonTitle }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("All fields are required.");
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: {
                    username, password
                }
            });

            if (response.ok) {
                router.push('/');
            }
        } catch (error) {

        }
    }

  return (
    <div className='flex flex-col justify-start mt-32 py-5 min-w-[380px] w-[90vw] sm:w-[35vw] sm:h-[70vh] bg-slate-100 rounded-2xl shadow-md space-y-6'>
    <h1 className='text-4xl py-5 font-semibold text-center'>{title}</h1>
    <div className='flex flex-col justify-center items-center gap-5'>
      <input type="text" placeholder='Username' className='form-input' onChange={(e) => setUsername(e.target.value)} required />
      <input type="text" placeholder='Password' className='form-input mb-5' onChange={(e) => setPassword(e.target.value)} required />
      <button className='colored-btn w-[80vw] sm:w-[32vw] md:w-[40vw] lg:w-[32vw] font-semibold' onClick={() => {}}>{buttonTitle}</button>
    </div>
    
    <div className="w-full flex items-center px-10">
      <div className="flex-grow h-px bg-gray-300"/>
      <span className="px-4 text-gray-500">or</span>
      <div className="flex-grow h-px bg-gray-300"/>
    </div>

    <div className='flex flex-col justify-center items-center gap-5 w-full'>
      <button className='rounded-full border border-gray-300 bg-white py-1.5 px-5 text-gray-700 hover:bg-slate-200 w-[80vw] sm:w-[32vw] md:w-[40vw] lg:w-[32vw] font-semibold'>Log in with Apple</button>
      <button className='rounded-full border border-gray-300 bg-white py-1.5 px-5 text-gray-700 hover:bg-slate-200 w-[80vw] sm:w-[32vw] md:w-[40vw] lg:w-[32vw] font-semibold'>Log in with Google</button>
    </div>
  </div>
  )
}

export default AuthForm