"use client"
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { assets } from '@/assets/assets';

const register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    setError(""); 
  }, [email, password])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
        setError("All fields are required.");
        return;
    }

    try {
      const response = await fetch('/api/register', {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email, password
          }),
      });

      if (response.ok) {
          setEmail("");
          setPassword("");
          setError("");
          router.push('/');
      } else {
        setError(response.json());
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex flex-col justify-start mt-32 py-5 min-w-[380px] w-[90vw] sm:w-[45vw] sm:h-[75vh] bg-slate-100 rounded-2xl shadow-md space-y-6'>
      <h1 className='text-4xl py-5 font-semibold text-center'>Sign Up</h1>
      <div className='flex flex-col justify-center items-center gap-5'>
        <input type="text" placeholder='testing@gmail.com' className='form-input' onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder='Password' className='form-input mb-5' onChange={(e) => setPassword(e.target.value)} required></input>
        <button className='colored-btn w-[80vw] sm:w-[32vw] md:w-[40vw] lg:w-[32vw] font-semibold' onClick={handleSubmit}>Register</button>
        {error && <span className='text-red-500 w-[90%] text-center'>{error}</span>}
      </div>

      <div className="w-full flex items-center px-10">
        <div className="flex-grow h-px bg-gray-300"/>
        <span className="px-4 text-gray-500">or</span>
        <div className="flex-grow h-px bg-gray-300"/>
      </div>

      <div className='flex flex-col justify-center items-center gap-4 w-full'>
        <button className='flex justify-center items-center gap-2 py-2 rounded-full border border-gray-300 bg-white px-5 text-gray-700 hover:bg-slate-200 w-[80vw] sm:w-[32vw] md:w-[40vw] lg:w-[32vw] font-semibold'><Image src={assets.apple} width={20} height={20}/>Apple</button>
        <button className='flex justify-center items-center gap-2 py-2 rounded-full border border-gray-300 bg-white px-5 text-gray-700 hover:bg-slate-200 w-[80vw] sm:w-[32vw] md:w-[40vw] lg:w-[32vw] font-semibold'><Image src={assets.google} width={20} height={20}/>Google</button>
        <p className='text-sm text-gray-500'>Already have an account? <Link href="/sign-in" className='text-blue-700 font-semibold hover:text-blue-900'>Sign in</Link></p>
      </div>
    </div>
  )
}

export default register