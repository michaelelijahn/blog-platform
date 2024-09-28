"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { formatDate } from '@/app/utils/utils';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { useSession } from 'next-auth/react';
import { useBlogContext } from './BlogsContext';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import TrendingFlatOutlinedIcon from '@mui/icons-material/TrendingFlatOutlined';
import CircleIcon from '@mui/icons-material/Circle';

const BlogCard = ({ id, title, author, image, date, savedStatus, setBlogs }) => {

  const { data: session, status } = useSession();
  const [saved, setSaved] = useState(savedStatus);
  const { fetchData } = useBlogContext();

  const handleSave = async () => {
    if (status !== 'authenticated') {
      alert("You need to be logged in to save blogs!");
      return;
    }

    setTimeout(() => {
      setSaved((prev) => !prev);
    }, 0.5);

    try {
      const response = await fetch(`/api/blog/saved`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: session?.user?.email,
          id
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        fetchData();
        console.log(data.message);
      } else {
        console.log(data.message);
      }
    } catch (e) {
      console.error('Error saving blog:', e);
    } 
  }

  return (
    <div className=' w-[80vw] sm:w-[70vw] md:w-[45vw] lg:w-[25vw] h-fit rounded-2xl p-3 pt-4 shadow-lg'>
      <Image className='h-[22vh] rounded-3xl mb-5 shadow-lg w' alt='blog image' src={image} width={370} height={30} />
      <div className='mb-3'>
        <div className='flex gap-2 items-center'>
          <AccountCircleOutlinedIcon />
          <h1 className=' text-sm text-gray-700'>{author}</h1>
        </div>
      </div>
      <h1 className='font-bold text-2xl mb-3 truncate w-[86%]'>{title}</h1>
      <div className='flex justify-between mb-3'>
        <Link href={`blog/${id}`} className='colored-btn text-left w-fit gap-2'>Read more <TrendingFlatOutlinedIcon fontSize='medium' /></Link>
        <span onClick={handleSave} className='text-gray-700 pr-3'>
          { saved ? <BookmarkAddedIcon fontSize='large'/> : <BookmarkBorderIcon fontSize='large' /> }
        </span>
      </div>
      <div className='text-yellow-400 flex items-center gap-4 mb-3 pl-1'>
          <CircleIcon/>
          <span className='text-sm text-gray-600'>{formatDate(date)}</span>
        </div>
    </div>
  )
}

export default BlogCard