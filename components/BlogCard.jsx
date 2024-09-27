"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { formatDate } from '@/app/utils/utils';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { useSession } from 'next-auth/react';
import { useBlogContext } from './BlogsContext';

const BlogCard = ({ id, title, author, image, date, savedStatus, owner }) => {

  const { data: session, status } = useSession();
  const [saved, setSaved] = useState(savedStatus);
  const { setEdited } = useBlogContext();

  const handleSave = async () => {
    if (status !== 'authenticated') {
      alert("You need to be logged in to save blogs!");
      return;
    }

    setSaved((prev) => !prev);

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
        console.log(data.message);
        setEdited(true);
      } else {
        console.log(data.message);
      }
    } catch (e) {
      console.error('Error saving blog:', e);
    } 
  }

  return (
    <div className=' w-[80vw] sm:w-[70vw] md:w-[60vw] lg:w-[25vw] h-fit rounded-2xl p-2'>
      <Image className='h-[22vh] rounded-3xl mb-5 shadow-lg' alt='blog image' src={image} width={300} height={30} />
      <div className='px-3'>
        <div className='flex space-x-6 items-start'>
          <div className='flex flex-col'>
            <span className='text-xs text-gray-600'>{formatDate(date)}</span>
            <h1 className='font-semibold text-lg mb-4'>{title}</h1>
          </div>
          <div onClick={handleSave}>
            { saved ? <BookmarkAddedIcon fontSize='large'/> : <BookmarkBorderIcon fontSize='large' /> }
          </div>
        </div>
        <h1 className='font-semibold text-lg mb-4'>{author}</h1>
        <Link href={`blog/${id}`} className='colored-btn text-left mb-2 w-fit'>Read more</Link>
      </div>
    </div>
  )
}

export default BlogCard