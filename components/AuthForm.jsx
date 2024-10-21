"use client"
import React, { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const AuthForm = () => {
  const router = useRouter();
  const { data : session } = useSession();

  if (session) {
    router.push("/");
  }

  return (
    <div className='flex flex-col justify-start mt-32 py-5 min-w-[380px] w-[90vw] sm:w-[45vw] sm:h-[25vh] bg-slate-100 rounded-2xl shadow-md space-y-3'>
      <h1 className='text-2xl py-5 font-semibold text-center'>Continue with Google </h1>

      <div className='flex flex-col justify-center items-center gap-4 w-full'>
        <button onClick={() => {
          signIn('google');
          }} className='flex justify-center items-center gap-2 py-2 rounded-full border border-gray-300 bg-white px-5 text-gray-700 hover:bg-slate-200 w-[80vw] sm:w-[32vw] md:w-[40vw] lg:w-[32vw] font-semibold'><Image src={assets.google} width={25} height={25}/>Google</button>
      </div>
    </div>
  )
}

export default AuthForm