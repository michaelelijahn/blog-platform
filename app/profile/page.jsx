"use client"
import React, { useState, useEffect } from 'react'
import { useBlogContext } from '@/components/BlogsContext'
import Loading from '@/components/Loading'
import BlogCard from '@/components/BlogCard'
import { useSession } from 'next-auth/react'
import { Avatar } from '@mui/material'
import Header from '@/components/Header'
import Image from 'next/image'


const Page = () => {
  const { blogs, userId, loading } = useBlogContext()
  const { data: session } = useSession()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [originalName, setOriginalName] = useState('')
  const [originalEmail, setOriginalEmail] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const ownedBlogs = blogs && blogs.filter(blog => blog.creator === userId)

  useEffect(() => {
    if (session?.user?.name && session?.user?.email) {
      setName(session.user.name)
      setEmail(session.user.email)
      setOriginalName(session.user.name)
      setOriginalEmail(session.user.email)
    }
  }, [session])

  const handleChange = () => {
    setIsEditing(true)
  }

  const handleConfirm = async () => {
    setOriginalName(name)
    setOriginalEmail(email)

    try {
      const response = await fetch('/api/auth/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          email,
          name,
        })
      })
    } catch (e) {
      console.error('Error updating user', error);
    } finally {
      setIsEditing(false)
    }
    // Here you would typically send the updated name and email to your backend
    console.log('Name updated to:', name)
    console.log('Email updated to:', email)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setName(originalName)
    setEmail(originalEmail)
  }

  return (
    <>
      <Header />
      <p className='text-4xl font-bold'>Profile</p>
      <div className='flex flex-col justify-center items-center glassmorphism w-[80vw] my-12'>
        {session?.user?.image && session?.user?.name ? 
          <Image className='rounded-full mb-10 mt-4' src={session?.user?.image} width={100} height={100}/>
          :
          <Avatar sx={{ width: 100, height: 100 }} className='mb-10 mt-4' />
        }
        <div className='w-full text-center'>
          <input 
            onChange={(e) => setName(e.target.value)}
            value={name}
            className='border border-gray-300 p-2 mt-1 mb-4 bg-transparent rounded-full text-md w-1/3' 
            type="text" 
            placeholder='Name'
            disabled={!isEditing}
          />
        </div>
        <div className='w-full text-center'>
          <input 
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-gray-300 p-2 mt-1 mb-4 bg-transparent rounded-full text-md w-1/3' 
            type="text" 
            placeholder='Email'
            disabled={!isEditing}
          />
        </div>
        {isEditing ? (
          <div className='flex gap-4'>
            <button 
              onClick={handleConfirm}
              className='rounded-full border-green-700 bg-green-700 py-2 px-5 mb-10 mt-5 text-white transition-all hover:bg-white hover:text-black hover:border-green-700 hover:border-solid hover:border-2'
            >
              Confirm
            </button>
            <button 
              onClick={handleCancel}
              className='rounded-full border-red-700 bg-red-700 py-2 px-5 mb-10 mt-5 text-white transition-all hover:bg-white hover:text-black hover:border-red-700 hover:border-solid hover:border-2'
            >
              Cancel
            </button>
          </div>
        ) : (
          <button 
            onClick={handleChange}
            className='rounded-full border-blue-700 bg-blue-700 py-2 px-5 mb-10 mt-5 text-white transition-all hover:bg-white hover:text-black hover:border-blue-700 hover:border-solid hover:border-2'
          >
            Change
          </button>
        )}
      </div>
      <p className='text-4xl font-semibold p-2'>My Blogs</p>
      {loading ? (
        <Loading/>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-3 sm:gap-8'>
          {ownedBlogs.map((blog) => (
            <BlogCard 
              key={blog?._id} 
              id={blog?._id} 
              title={blog?.title}
              author={blog?.author} 
              image={blog?.image} 
              date={blog?.createdAt}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default Page