"use client"
import React from 'react'
import AuthForm from '@/components/AuthForm';

const register = () => {
  return (
    <AuthForm title={"Sign Up"} buttonTitle={"Register"} api={"/api/auth/register"} />
  )
}

export default register