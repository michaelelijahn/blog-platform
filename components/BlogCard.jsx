"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link';
import { formatDate } from '@/app/utils/utils';

const BlogCard = ({ id, title, author, image, date }) => {

  return (
    <div className=' w-[80vw] sm:w-[70vw] md:w-[60vw] lg:w-[25vw] h-fit rounded-2xl p-2'>
      <Image className='h-[22vh] rounded-3xl mb-5 shadow-lg' alt='blog image' src={image} width={300} height={30} />
      <div className='px-3'>
        <span className='text-xs text-gray-600'>{formatDate(date)}</span>
        <h1 className='font-semibold text-lg mb-4'>{title}</h1>
        <h1 className='font-semibold text-lg mb-4'>{author}</h1>
        <Link href={`blog/${id}`} className='colored-btn text-left mb-2 w-fit'>Read more</Link>
      </div>
    </div>
  )
}

export default BlogCard