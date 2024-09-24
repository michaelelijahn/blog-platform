"use client"
import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import Loading from './Loading'
import SearchIcon from '@mui/icons-material/Search';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    try {
      const response = await fetch('/api/blog');
      const data = await response.json();
      console.log("test");
      console.log(data);
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  }

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
      <p className='font-semibold text-2xl py-2 mb-4'>Most Recent Blogs</p>
      {loading ? (
        <Loading/>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-3 sm:gap-8'>
          {blogs.map((b) => (
            <BlogCard 
              key={b._id} 
              id={b._id} 
              title={b.title}
              author={b.author} 
              image={b.image} 
              date={b.createdAt} 
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Blogs