"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useAuth } from './AuthContext';

const AuthForm = ({ title, buttonTitle, api }) => {
  const [username, setUsername] =  useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { data : session } = useSession();
  const { setIsUserLoggedIn } = useAuth();

  useEffect(() => {
    setError(""); 
  }, [username, email, password])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ((title === "Sign Up" && !username) || !email || !password) {
        setError("All fields are required.");
        return;
    }

    try {
      const response = await fetch(api, {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username, email, password
          }),
      });

      if (response.ok) {
          if (title === "Sign Up") setUsername("");
          setEmail("");
          setPassword("");
          setError("");
          setIsUserLoggedIn(true);
          router.push('/');
      } else {
        setError(response.json());
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (session) {
    router.push("/");
  }

  return (
    <div className='flex flex-col justify-start mt-32 py-5 min-w-[380px] w-[90vw] sm:w-[45vw] sm:h-[78vh] bg-slate-100 rounded-2xl shadow-md space-y-6'>
      <h1 className='text-4xl py-5 font-semibold text-center'>{title}</h1>
      <div className='flex flex-col justify-center items-center gap-3'>
        {title !== "Sign Up" ? null : <input type="text" placeholder='ex : johnDoe123' className='form-input' onChange={(e) => setUsername(e.target.value)} required />}
        <input type="text" placeholder='ex: testing@gmail.com' className='form-input' onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder='Password' className='form-input mb-5' onChange={(e) => setPassword(e.target.value)} required />
        <button className='colored-btn w-[80vw] sm:w-[32vw] md:w-[40vw] lg:w-[32vw] font-semibold' onClick={handleSubmit}>{buttonTitle}</button>
        {error && <span className='text-red-500 w-[90%] text-center'>{error}</span>}
      </div>

      <div className="w-full flex items-center px-10">
        <div className="flex-grow h-px bg-gray-300"/>
        <span className="px-4 text-gray-500">or</span>
        <div className="flex-grow h-px bg-gray-300"/>
      </div>

      <div className='flex flex-col justify-center items-center gap-4 w-full'>
        {/* <button onClick={() => {
          signIn('github');
          }} className='flex justify-center items-center gap-2 py-2 rounded-full border border-gray-300 bg-white px-5 text-gray-700 hover:bg-slate-200 w-[80vw] sm:w-[32vw] md:w-[40vw] lg:w-[32vw] font-semibold'><Image src={assets.github} width={25} height={25}/>Github</button> */}
        <button onClick={() => {
          signIn('google');
          }} className='flex justify-center items-center gap-2 py-2 rounded-full border border-gray-300 bg-white px-5 text-gray-700 hover:bg-slate-200 w-[80vw] sm:w-[32vw] md:w-[40vw] lg:w-[32vw] font-semibold'><Image src={assets.google} width={25} height={25}/>Google</button>
          {title === "Sign Up" && <p className='text-sm text-gray-500'>Already have an account? <Link href="/sign-in" className='text-blue-700 font-semibold hover:text-blue-900'>Sign in</Link></p>}
      </div>
    </div>
  )
}

export default AuthForm