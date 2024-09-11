"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/components/AuthContext';

const SignIn = () => {
  // const [fullName, setFullName] =  useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");
  // const router = useRouter();
  // const { data : session } = useSession();
  // const { setIsUserLoggedIn } = useAuth();

  // useEffect(() => {
  //   setError(""); 
  // }, [email, password])

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!email || !password) {
  //       setError("All fields are required.");
  //       return;
  //   }

  //   try {
  //     const response = await fetch('/api/auth/login', {
  //         method: "POST",
  //         headers: {
  //             "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify({
  //           email, password
  //         }),
  //     });

  //     if (response.ok) {
  //         setEmail("");
  //         setPassword("");
  //         setError("");
  //         setIsUserLoggedIn(true);
  //         router.push('/');
  //     } else {
  //       setError(response.json());
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // if (session) {
  //   router.push("/");
  // }

  // handleSubmit={handleSubmit} setEmail={setEmail} setPassword={setPassword} error={error}
  return (
      <AuthForm title={"Welcome Back"} buttonTitle={"Sign In"} api={"/api/auth/login"} />
  )
}

export default SignIn