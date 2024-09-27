"use client"
import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import Loading from './Loading'
import SearchIcon from '@mui/icons-material/Search';
import { useSession } from 'next-auth/react';
import { useBlogContext } from './BlogsContext';

const Blogs = () => {
  const { blogs, savedBlogIds, userId, loading } = useBlogContext();

  return (
    <div className='flex flex-col items-center sm:items-start'>
      <span className='flex gap-2 sm:text-start mb-10 w-[70vw] max-w-[700px] md:w-[45vw] lg:w-[40vw] lg:max-w-[1200px] pl-3 border border-solid border-gray-300 py-1 rounded-full'>
        <SearchIcon/>
        <input 
          type="text" 
          className='w-full border-none outline-none focus:ring-0 focus:outline-none bg-transparent'
          placeholder={`I'm looking for...`}
        />
      </span>
      <p className='font-semibold text-2xl py-2 mb-4'>Blogs</p>
      { loading ? (
        <Loading/>
      ) : (
        blogs && blogs.length > 0 && (
          <div className='grid grid-cols-1 lg:grid-cols-3 sm:gap-8'>
            {blogs.map((b) => {
              const isSaved = savedBlogIds?.includes(b._id) || false;
              return (
                <BlogCard 
                  key={b._id} 
                  id={b._id} 
                  title={b.title}
                  author={b.author} 
                  image={b.image} 
                  date={b.createdAt}
                  savedStatus={isSaved}
                  owner={b.creator === userId}
                />
              );
            })}
          </div>
        )
      )}
    </div>
  )
}

export default Blogs;
