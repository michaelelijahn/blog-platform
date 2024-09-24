"use client"
import React from 'react'
import AuthForm from '@/components/AuthForm';

const SignIn = () => {
  return (
      <AuthForm title={"Welcome Back"} buttonTitle={"Sign In"} api={"/api/auth/login"} />
  )
}

export default SignIn